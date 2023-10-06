import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export let cartContext =createContext()
let headers={
    token:localStorage.getItem('token')
}

function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id },{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }

  function getProductFromCart() {
    
 

    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((response)=>
        response
    ).catch((error)=>
          error
    )

  }


  function removeItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }


  function removeAllItems() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }


  function updateCount(id, count) {
   
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }
  function onlinePayment(cartId,values,url) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
      shippingAddress:values
    },{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }
  function cashOnDelivery(cartId,values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
      shippingAddress:values
    },{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }
  function getUsersOrder(cartId,values) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`).then((response)=>
    response
    ).catch((error)=>
    error
    )
  }
export default function CartContextProvider(props){
  let [cartId,setCartId]=useState(null)
 
  
async function getCart(){
  let {data} =await getProductFromCart()
  setCartId(data?.data._id)
}

// useEffect(()=>{
//     getCart()
  
// },[])

    return<> <cartContext.Provider value={{addToCart,getUsersOrder,cashOnDelivery,cartId,onlinePayment, getProductFromCart ,removeItem, removeAllItems,updateCount}}>
        {props.children}

    </cartContext.Provider>
    
    </>
}
