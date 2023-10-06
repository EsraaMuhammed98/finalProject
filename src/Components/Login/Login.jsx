import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import * as Yup from'yup'
import { userContext } from '../../Context/userContext';
import { useContext } from 'react';
export default function Login() {

  let navigate =useNavigate()
  let [error,setError]=useState(null)
  let {userToken , setUserToken}= useContext(userContext)


 async function submitForm(values){
  let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch(e=>{setError(e)})
localStorage.setItem('token' , data.token)
setUserToken(data.token)
  navigate('/')

}


let validate=Yup.object({
  email:Yup.string().email().required('Email is Required'),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{6}/ ,'Password Must Start With Capital Char and be more Than 6').required('Password is Required'),
})
let formik=useFormik({
  initialValues:
  {
    email:'',
    password:'',
  },validationSchema:validate
  ,onSubmit:submitForm
})
  return <>
  <div className='w-75 mx-auto'>
 
    <form onSubmit={formik.handleSubmit}>
    <h1 className='text-center'>Login</h1>
  
    <label htmlFor="email">Email: </label>
    <input type="email" className='form-control' id='email' 
     onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}/>
{formik.errors.email&&formik.touched.email?<div className="alert alert-warning p-2">{formik.errors.email}</div>:''}
  
  
  
    <label htmlFor="password">Password: </label>
    <input type="password" className='form-control' id='password'
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.password} />
{formik.errors.password&&formik.touched.password?<div className="alert alert-warning p-2">{formik.errors.password}</div>:''}
  
 {error ? <p className='alert alert-danger'>{error.response.data.message}</p> : ''}
 <div className="btns d-flex justify-content-center flex-column align-items-center mt-3">
   
<button type='submit' to='/products' disabled={!(formik.dirty&&formik.isValid)} className='btn cursor-pointer bg-main text-white me-3 mb-3' >Login</button>

 <Link type='button' to='/forget-password'  className={styles.forgetPass}>Forget Password ?</Link>
 </div>
  </form>
  </div>
  </>
}
