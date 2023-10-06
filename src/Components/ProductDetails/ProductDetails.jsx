import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import {  useQuery } from 'react-query';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  let {addToCart}= useContext(cartContext)
  
  async function AddToCartFunc(id){
   let respons =await addToCart(id)
   if(respons.data.status === 'success'){
      toast('Product Added')
    }else{
      toast('Product Faild To Add')
    }
    }

  let params = useParams()

   function getProductDetails(id){
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    

  }
let {data} = useQuery('productDetails' , ()=>getProductDetails(params.id))

  return <>
  <div className="container ">
  {data?.data.data ?  
    <div className="row ">
      <div className="col-md-4">
          <Slider {...settings}>
           {data?.data.data.images.map((img)=><img key={data?.data.data.id} alt={data?.data.data.title} src={img} className='w-75'/>)}
          </Slider>
        </div>
 
      <div className="col-md-8 d-flex align-items-center">
        <div className="content-details ">
          <h2>{data?.data.data.title}</h2>
          <p>{data?.data.data.description}</p>
          <h6 className='text-main'>{data?.data.data.category?.name}</h6>
          <h6  className='text-main'>Price : {data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between">
              <h6><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</h6>
              <h6>{data?.data.data.ratingsQuantity}</h6>
            </div>

            <button className='btn bg-main text-white my-5 w-100' onClick={()=>AddToCartFunc(data?.data.data.id)}>Add To Cart</button>
        </div>

      </div>
    </div>
   : ''}
   </div>
  </>
}
