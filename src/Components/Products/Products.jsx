import React, { useContext, useEffect, useState } from 'react';
 import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
 import toast from 'react-hot-toast';
import { wishContext } from '../../Context/WishListContext';
import ReactPaginate from 'react-paginate';
import Pagination from '../Pagination/Pagination';
import { userContext } from '../../Context/userContext';
 

export default function Products({handleSearch}) {
// console.log(handleSearch)
  let [products , setProducts] = useState([])
  let [loading , setLoading] = useState(true)
  let [pageCount , setPageCount] = useState(1)
 
  function handlePages({selected}){
    let select = selected+1;
    getProduct(select)
     }
  let [wishRes, setWishRes] = useState([]);
  
  let {addWish,getWishList,deleteFromWishList} = useContext(wishContext)

let {addToCart}= useContext(cartContext)
let {search}= useContext(userContext)

async function AddToCartFunc(id){
 let respons =await addToCart(id)
 if(respons.data.status === 'success'){
    toast('Product Added')
  }else{
    toast('Product Faild To Add')
  }
  }
  async function getProduct(page){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
    setProducts(data)
    setLoading(false)
    setPageCount(data?.metadata?.numberOfPages)
    
  }
  
async function addToWishList(id){
let res = await addWish(id)
setWishRes(res?.data?.data)
getFromWishList() 
// removeFromWishList()
 if(res.data.status === 'success'){
    toast('Product Added')
  }else{
    toast('NotFound')
  }
}

async function getFromWishList(){
let res = await getWishList()
setWishRes(res?.data?.data)
if(res?.data?.status === 'success'){
    toast('Product Added')
  }else{
    toast('NotFound')
  }
}

async function removeFromWishList(id){
let res = await deleteFromWishList(id)
setWishRes(res?.data?.data)
// getFromWishList() 

// if(res.data.status === 'success'){
//     // toast('Product Added')
//   }else{
//     // toast('NotFound')
//   }
}



  useEffect(()=>{    
    getProduct()
     getFromWishList()
   
  },[search])

 return <>
 <div className="container p-0 py-2 my-5">

<div className="row g-4 p-0">

{search? products?.data?.map((product)=>product.title.includes(search)?
    <div key={product.id} className="col-md-2">
    <div className="product cursor-pointer" >
    <span className='heart-icon' onClick={()=>wishRes?.find((prd)=> prd.id ===product.id)? removeFromWishList(product.id): addToWishList(product.id)}  >
      <i className={`fas fa-heart ${wishRes?.find((prd)=> prd.id ===product.id) ? 'clicked':''} `}

    >
        
     </i>
     </span>

  <Link to={`/productdetails/${product.id}`}>
    <img src={product.imageCover} className='w-100' alt="" />
    <span className='text-main font-sm fw-bold'>{product.category.name}</span>
    <h3 className="h6">{product.title.split(' ').slice(0,2).join(' ')}</h3>

    <div className="rate d-flex justify-content-between py-2 btn-sm">
      <span>{product.price} EGP</span>
      <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
    </div>
</Link>

      <button className='btn bg-main w-100 text-white' onClick={()=>AddToCartFunc(product.id)}><i className='fas fa-shopping-cart'></i> Add To Cart</button>
    </div>
   </div> 
   :''
)
:''}



{!loading?<>
  {!search?products?.data?.map((product)=>
    <div key={product.id} className="col-md-2">
    <div className="product cursor-pointer" >
    <span className='heart-icon' onClick={()=>wishRes?.find((prd)=> prd.id ===product.id)? removeFromWishList(product.id): addToWishList(product.id)}  >
      <i className={`fas fa-heart ${wishRes?.find((prd)=> prd.id ===product.id) ? 'clicked':''} `}

    >
        
     </i>
     </span>

  <Link to={`/productdetails/${product.id}`}>
    <img src={product.imageCover} className='w-100' alt="" />
    <span className='text-main font-sm fw-bold'>{product.category.name}</span>
    <h3 className="h6">{product.title.split(' ').slice(0,2).join(' ')}</h3>

    <div className="rate d-flex justify-content-between py-2 btn-sm">
      <span>{product.price} EGP</span>
      <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
    </div>
</Link>

      <button className='btn bg-main w-100 text-white' onClick={()=>AddToCartFunc(product.id)}><i className='fas fa-shopping-cart'></i> Add To Cart</button>
    </div>
   </div> 
)
     : ''  }
     </>
    : <HashLoader cssOverride={{position:'absolute' , left:'50%' , transform:'translateX(-50%)'}} color="#36d7b7" />  
}
 






{!search&& products.data?<Pagination pageCount={pageCount} handlePages={handlePages}/>
:''}


</div>



 
 
</div>
 
  </>
}
 