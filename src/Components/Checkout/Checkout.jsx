import React, { useContext, useState } from 'react';
import styles from './Checkout.module.css';
import { Form, useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from'yup'

export default function Checkout() {
  let validation= Yup.object({
    details:Yup.string().min(3,'Details min length is 3').required('Details is Required'),
    phone:Yup.string().matches(/^01[01245]\d{8}$/ , 'Phone Must Start With (010-011-012-014)').required('Phone is Required'),
    city:Yup.string().required('City is required')
  })

 let {onlinePayment,cashOnDelivery,cartId}= useContext(cartContext)
let [response,setResponse]=useState()
let params=useParams()
let navigate = useNavigate()
// console.log(params.p);
 async function handleCheckOut(values){
  if(params.p==='online'){
    let res= await onlinePayment(cartId,values ,'http://localhost:3000')
    window.location.href=res?.data.session.url
    //  console.log(res?.data.session.url)
  }else if(params.p==='cash'){
    let res= await cashOnDelivery(cartId,values)
    setResponse(res)
    navigate('/cashdetails' , response=response)
  }


}


  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },validationSchema:validation
   , onSubmit:handleCheckOut
  })
  return <>
    <div className="box">
      <div className="boxContent w-50">
      <h1 className='animate__animated animate__flip logo'>Checkout</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
      <label htmlFor="details">Details: </label>
      <input type="text" id='details' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name='details' placeholder='Enter Your Email' className='form-control mt-2' />
      {formik.errors.details&& formik.touched.details?<div className="alert alert-warning p-2">{formik.errors.details}</div>:''}
      </div>
      
      <div className="form-group my-3">
      <label htmlFor="phone">phone: </label>
      <input type="tel" placeholder='Enter Your Phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' className='form-control mt-2'/>
      {formik.errors.phone&& formik.touched.phone?<div className="alert alert-warning p-2">{formik.errors.phone}</div>:''}
      </div>

      <div className="form-group my-3">
      <label htmlFor="city">city: </label>
      <input type="text" placeholder='Enter Your City' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} id='city' className='form-control mt-2'/>
      {formik.errors.city&& formik.touched.city?<div className="alert alert-warning p-2">{formik.errors.city}</div>:''}
      
      </div>
    <button className='btn bg-main text-white'  disabled={!(formik.dirty&&formik.isValid)} type='submit'>Pay Now</button>
    </form>
      </div>
    </div>
  </>
}
