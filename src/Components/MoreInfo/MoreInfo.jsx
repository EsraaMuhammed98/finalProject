import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export default function MoreInfo() {
  let [isLoading,setIsLoading]=useState(false)

  let token =localStorage.getItem('token')
let headers={
  token:token
}

  async function getAddress(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`,{
      headers
    }).then((res)=>res)
    .catch((e)=>e )
  }
  async function removeAddress(id){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,{
      headers
    }).then(setIsLoading(true))
    .catch((e)=>e )
  }

let {data} = useQuery('getAddress',getAddress)
 
  return<>
   {!isLoading? <div className="row g-3 my-4 bg-main-light">
  { data?.data.data.map((address)=>
     <div key={address._id} className="col-md-6 border-bottom text-center py-4">
         <div className="info">
          <h3>Name: {address.name}</h3>
          <h3>Details: {address.details}</h3>
          <h3>Phone: {address.phone}</h3>
          <h3>City: {address.city}</h3>
 <button onClick={()=>removeAddress(address._id)} className='btn btn-outline-danger my-3'>Remove Address</button>  
     
       
      </div>
        </div>



  ) }
  </div>:<i className='fa fa-spinner'></i>}
  </>
}
