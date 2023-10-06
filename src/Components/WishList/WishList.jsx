import React, { useContext, useState } from "react";
import styles from "./WishList.module.css";
import { wishContext } from "../../Context/WishListContext";
import { useQuery } from "react-query";
import sale from "../../Assets/images/sale.png";
import { useEffect } from "react";

export default function WishList() {
  let [wishes, setWishes] = useState([]);
  let { getWishList, deleteFromWishList } = useContext(wishContext);

  async function deleteWish(id) {
    let { data } = await deleteFromWishList(id);
    setWishes(data);
  }
  async function getAllWishes() {
    let { data } = await getWishList();
    setWishes(data);
  }
  useEffect(()=>{
    getAllWishes()
  },[wishes])
  return (
    <>
      <div className="content bg-main-light p-3">
        <h1>WishList</h1>
        {wishes&& wishes?.data?.data?.map((w) => (
          <>
            {wishes?.filter(( f) => f.id === w.id )  ? (<><div className="row gy-3 align-items-center py-5 border-bottom " key={w.id} >
                  <div className="col-md-2  py-2">
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
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </>
  );
}
