import React, { useState } from 'react';
// import styles from './MoreInfo.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AddInfo() {
  let[name,setName]=useState(null)
 let[details,setDetails]=useState(null)
 let[phone,setPhone]=useState(null)
 let[city,setCity]=useState(null)

 let headers={
    token:localStorage.getItem('token')
  }

  async function addAddreess() {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`,{
      "name": name,
      "details": details,
      "phone": phone,
      "city": city
  },{headers}).then((res)=>toast(res.data.message)).catch((e)=>console.log(e))
  }
  return <>
  <div className="box m-3">
    <div className="boxContent w-50">
    <h1 className='text-center'>MoreInfo</h1>
    <form>
      <div className="form-group my-4">
    <label htmlFor="name">Name Of Your Addreess</label>
      <input type="text" name="current" id="name" onInput={(e)=>setName(e.target.value)} placeholder='Current Password' className='form-control' />
      </div>

      <div className="form-group my-4">
      <label htmlFor="password">Details</label>
      <input type="text" name="details" onInput={(e)=>setDetails(e.target.value)} id="details" placeholder='Details' className='form-control' />
      </div>
      <div className="form-group my-4">
      <label htmlFor="password">City</label>
      <input type="text" name="city" onInput={(e)=>setCity(e.target.value)} id="city" placeholder='city' className='form-control' />
      </div>

      <div className="form-group my-4">
      <label htmlFor="phone">phone</label>
      <input type="tel" name="phone" onInput={(e)=>setPhone(e.target.value)} id="phone" placeholder='Phone' className='form-control' />
      </div>
      <Link to='#' className='m-50 w-auto d-block btn btn-outline-success' onClick={addAddreess}>Add More Info</Link>
    </form>
    </div>
  </div>
  </>
}
