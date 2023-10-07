import React, { useContext, useEffect, useRef, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
 

export default function Cart() {
  
  let {getProductFromCart, removeItem,updateCount , removeAllItems}= useContext(cartContext)
let [cart,setCart] =useState(null)
let [loading,setLoading] =useState(true)

 



//  let {data,isError} = useQuery('cart',cartProduct)
 
async function updateCart(id , count) {
  let {data} =await updateCount(id ,count)
if(data?.status =="success"){
  setCart(data)
  setLoading(false)
}
} 
async function removeFromCart(id) {
  let {data} =await removeItem(id)
  
   setCart(data)
   setLoading(false)

} 
async function clearAll(){
  let {data}=await removeAllItems()
  if(data?.message == "success"){
    setCart(null)
    setLoading(false)
  } 
} 
async function cartProduct() {
  let {data} =await getProductFromCart()
    if(data?.status=='success'){
      setCart(data)
      setLoading(false)
    }   else{
      setCart(null)
    }
 
  } 

useEffect(()=>{
    cartProduct()
},[cart])


  return <>
{!loading ?<div className="w-75 mx-auto bg-main-light p-5 ">
 <h1 className='py-3'>Shopping Cart</h1>
 <h5><span className='text-main'>Numbers OF Cart: </span>{cart?.numOfCartItems }</h5>
<div className='d-flex justify-content-between'>
 <h5><span className='text-main'>Total: </span>{cart?.data?.totalCartPrice}</h5>
<button className='btn bg-main text-white' onClick={()=>clearAll()}>Clear ALL</button>
</div>
 {cart?.data?.products.map((prd)=><div key={prd._id} className="row my-3 border-bottom pb-2">
    <div className="col-md-2">
      <img src={prd.product.imageCover} alt={prd.product?.title} className='w-100' />
    </div>
    <div className="col-md-10 d-flex justify-content-between align-items-center  ">
      <div>
      <h6>{prd.product.title}</h6>
      <h6 className=' text-main'>Price: {prd.price} EGP</h6>
      <button className='btn' onClick={()=>removeFromCart(prd.product._id)}><i className='fas fa-trash-can me-2 text-danger'></i>remove</button>
      </div>

      <div>
        <button className='boderBtn' disabled={prd.count<=0} onClick={()=>updateCart(prd.product.id ,prd.count -1)}>-</button>
        <span className='mx-1'>{prd.count}</span>
        <button className='boderBtn'  onClick={()=>updateCart(prd.product.id ,prd.count +1)}>+</button>
      </div>
    </div>
  </div>)}
  <Link to='/checkout/cash' className='btn btn-outline-success'>Cash On Delivery</Link>
  <Link to='/checkout/online' className='btn btn-outline-success m-2'>Online Payment</Link>
  </div>
  :<HashLoader cssOverride={{position:'absolute' , left:'50%' , transform:'translateX(-50%)'}} color="#36d7b7" /> 

}
  
  </>
}
