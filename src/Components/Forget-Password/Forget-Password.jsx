import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
// import styles from './ForgetPassword.module.css';
import * as yup from 'yup'
export default function ForgetPassword() {
// let [error,setError]=useState('')
let [email,setEmail] =useState('')

let validationSchema= yup.object({email:yup.string().email().required('Email is Required')})

 async function handleForgetPassword(values){
  // console.log(values.email)
  return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
    email:values.email
  }).then((res)=>res
  ).catch((e)=>e)
}

let formik = useFormik({
  initialValues:{
    email:'',
  },validationSchema,
  onSubmit:handleForgetPassword
})

  
  return <>
 <form onSubmit={formik.handleSubmit}>
   <label htmlFor="email" className='h3 fw-bolder mb-3'>    reset your account password</label>
    <input type="email" className='form-control' id='email' 
     onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}/>
{formik.errors.email?<div className="alert alert-warning p-2">Invalid Email</div>:''} 
        <Link className='btn btn-outline-success mt-2' type='submit'
         to={!formik.errors.email?'/verify-code' : '' }
         >verify</Link>
   </form>
  </>
}
