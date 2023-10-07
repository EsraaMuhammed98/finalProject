import React, { useContext, useState } from "react";
import styles from "./WishList.module.css";
import { wishContext } from "../../Context/WishListContext";
import { useQuery } from "react-query";
import sale from "../../Assets/images/sale.png";
import { useEffect } from "react";
import { HashLoader } from 'react-spinners';

export default function WishList() {
  let [wishes, setWishes] = useState([]);
  let [loading, setLoading] = useState(true);
  let { getWishList, deleteFromWishList } = useContext(wishContext);

  async function deleteWish(id) {
    let { data } = await deleteFromWishList(id);
    setWishes(data);
  }
  async function getAllWishes() {
    let { data } = await getWishList();
    setWishes(data);
    setLoading(false)
  }
  useEffect(()=>{
    getAllWishes()
  },[])
  console.log(wishes?.data)
  return (
    <>
      <div className="container bg-main-light p-3">
        <h1 className="text-center text-main">WishList</h1>
        { !loading ? wishes?.data?.map((w) => (
          <>
            {wishes?.data.filter(( f) => f.id === w.id )  ? (<><div  className="row gy-3 align-items-center py-5 border-bottom " key={w.id} >
                  <div key={w.id} className="col-md-2  py-2">
                    <img src={w.imageCover} className="w-100" alt={w.name} />
                  </div>
                  <div className="col-md-9 offset-1 py-2">
                    <div className="wish-content position-relative ">
                      <div className={styles.catInfo}>
                        <p className={styles.category}>{w.category.name}</p>
                        {w.priceAfterDiscount ? (
                          <img src={sale} className={styles.sale} />
                        ) : (
                          ""
                        )}
                      </div>
                      <h4>{w.subcategory[0].name}</h4>
                      <h6>{w.title}</h6>
                      {/* textDecoration: 'line-through' } */}
                      {w.priceAfterDiscount ? (
                        <p>
                          <span className="text-main">Price: </span>{" "}
                          <span
                            style={{
                              marginRight: "10px",
                              textDecoration: "line-through",
                            }}
                          >
                            {w.price}EGP
                          </span>{" "}
                          {w.priceAfterDiscount}EGP{" "}
                        </p>
                      ) : (
                        <p>
                          <span className="text-main">Price: </span>
                          {w.price}EGP
                        </p>
                      )}
                      <p>
                        <span className="text-main">Brand : </span>
                        {w.brand.name}
                      </p>
                      <div className="d-flex justify-content-between">
                        <p>
                          {" "}
                          <span className="text-main">ratingsQuantity : </span>
                          {w.ratingsQuantity}
                        </p>
                        <p>
                          {" "}
                          <span className="text-main">ratingsAverage : </span>
                          {w.ratingsAverage}{" "}
                          <i className="fas fa-star rating-color "></i>
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteWish(w.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : ("")}
          </>
              )):<HashLoader cssOverride={{position:'absolute' , left:'50%' , transform:'translateX(-50%)'}} color="#36d7b7" />
                       }
      </div>
    </>
  );
}
