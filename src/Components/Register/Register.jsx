import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import styles from './Register.module.css';
import * as Yup from'yup'
export default function Register() {
  let Navigate =   useNavigate()
  let [error,setError]=useState(null)
  
 async function submitForm(values){
  let data =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values).catch(e=>{
      setError(e)
    })
    Navigate('/login')
    // Navigate('/Login')
  // console.log(data)

}

// function validate(values){
//   let error={};
//   if(!values.name){
//     error.name='Required Name'
//   }else if(values.name.length < 3){
//     error.name='minLenght Must Be More Than 3'
//   }else if(values.name.length >10){
//     error.name='maxLenght Must Be less Than 10'
//   }

//   if(!values.phone){
//     error.phone='Required Phone'
//   }else if(!/^01(1245){8}$/.test(values.phone)){
//     error.phone='Phone Number Must be one of this(010-011-012-014-015)'
//   }



//   return error
// }

let validate=Yup.object({
  name:Yup.string().min(3,'Name Must Be More Than 3').max(10,'Name Must Be Less Than 10')
  .required('Name is Required'),
  email:Yup.string().email().required('Email is Required'),
  phone:Yup.string().matches(/^01[01245]\d{8}$/ , 'Phone Must Start With (010-011-012-014)').required('Phone is Required'),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{6}/ ,'Password Must Start With Capital Char and be more Than 6').required('Password is Required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and RePassword Must be same').required('rePassword is Required'),


})
let formik=useFormik({
  initialValues:
  {
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:'',
  },validationSchema:validate
  ,onSubmit:submitForm
})
  return <>
  <div className='w-75 mx-auto'>
    <form onSubmit={formik.handleSubmit}>
    <h1 className='text-center'>Register</h1>
    <label htmlFor="name">Name: </label>
    <input type="text" onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.name}
    className='form-control' id='name' />
{formik.errors.name&& formik.touched.name?<div className="alert alert-warning p-2">{formik.errors.name}</div>:''}


    <label htmlFor="email">Email: </label>
    <input type="email" className='form-control' id='email' 
     onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}/>
{formik.errors.email&&formik.touched.email?<div className="alert alert-warning p-2">{formik.errors.email}</div>:''}
  
    <label htmlFor="phone">Phone: </label>
    <input type="tel" className='form-control' id='phone'
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.phone} />
{formik.errors.phone&&formik.touched.phone?<div className="alert alert-warning p-2">{formik.errors.phone}</div>:''}
  

    <label htmlFor="password">Password: </label>
    <input type="password" className='form-control' id='password'
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.password} />
{formik.errors.password&&formik.touched.password?<div className="alert alert-warning p-2">{formik.errors.password}</div>:''}
  
    <label htmlFor="rePassword">rePassword: </label>
    <input type="password" className='form-control' id='rePassword'
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.rePassword} />
{formik.errors.rePassword&&formik.touched.rePassword?<div className="alert alert-warning p-2">{formik.errors.rePassword}</div>:''}

  <button type='submit'disabled={!(formik.dirty&&formik.isValid)} className='btn bg-main text-white mt-3' >Registration</button>
  </form>
  </div>
  </>
}
