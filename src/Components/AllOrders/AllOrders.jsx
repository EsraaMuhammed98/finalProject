import React, { useContext, useState } from 'react';
import styles from './AllOrders.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/CartContext';
import jwtDecode from 'jwt-decode';

export default function AllOrders() {
  let [allData,setAllData]=useState({})
  let incodedToken=localStorage.getItem('token')
  let {id}=jwtDecode(incodedToken)
 console.log(id)
  async function getAllOrders(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`).then((res)=>res).catch((e)=>e)
  }
  let {data} = useQuery('allOrders' ,getAllOrders )
  console.log(data?.data)
  return<>  
   <div className="bg-main-light p-4">
    <h1 className='text-center my-5'>AllOrders</h1>
 
    <div className="row my-5  d-flex justify-content-center text-center align-items-center">
     <div className="col-md-3 text-main fw-bolder">Products: </div>
     <div className="col-md-3 text-main fw-bolder">Address: </div>
     <div className="col-md-3 text-main fw-bolder">Shupping Info: </div>
     <div className="col-md-3 text-main fw-bolder">User Info: </div>
     </div>
{
  
  data?.data.map((shapping)=><>
   
     {
      <div className="row my-5 border-bottom text-center align-items-center">
            <div className="col-md-3">
            {shapping.cartItems.map((item)=><>
  <div className="row my-3 align-items-center">
    <div className="col-md-5">
    <img src={item.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-7">
    <p><span className='text-main  fw-bolder'>Count: </span>{item.count} </p>   
    <p><span className='text-main  fw-bolder'>Price: </span>{item.price} EGP</p>   
    <p><span className='text-main  fw-bolder'>Title: </span>{item.product.title} </p>   
    <p><span className='text-main  fw-bolder'>Brand: </span>{item.product.brand.name} </p>   

    </div>
    </div>   
 
</>
)

}
            </div>
      <div className="col-md-3">
        <div className="shapping">
        <p><span className='text-main  fw-bolder'>Address: </span>{shapping.shippingAddress.details}</p>
        <p><span className='text-main  fw-bolder'>Phone: </span>{shapping.shippingAddress.phone}</p>
        <p><span className='text-main  fw-bolder'>City: </span>{shapping.shippingAddress.city}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="orderInfo">
          <p><span className='text-main fw-bold'>Total Price: </span>{shapping.totalOrderPrice} EGP</p>
          <p><span className='text-main fw-bold'>Tax Price: </span>{shapping.taxPrice}</p>
          <p><span className='text-main fw-bold'>Shipping Price: </span>{shapping.shippingPrice}</p>
          <p><span className='text-main fw-bold'>Payment: </span>{shapping.paymentMethodType}</p>
          <p><span className='text-main fw-bold'>Paid: </span>{shapping.isPaid.toString()}</p>
          <p><span className='text-main fw-bold'>Deliverd: </span>{shapping.isDelivered.toString()}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="userInfo">
          <p><span className='text-main fw-bold'>Name: </span>{shapping.user.name}</p>
          <p><span className='text-main fw-bold'>Email: </span>{shapping.user.email}</p>
          <p><span className='text-main fw-bold'>Phone: </span>{shapping.user.phone}</p>
        </div>
      </div>

    
    </div>}
     
  </>)
}

</div>
      </>
 
 
}