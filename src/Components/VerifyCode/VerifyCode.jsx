import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function VerifyCode () {
let [code,setCode] = useState('')
let [error,setError] = useState(null)
let [response,setResponse] = useState(null)

async function verifyCode(){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
      resetCode:code
     }).then((res)=>setResponse(res)
    ).catch((e)=>setError(e)
    )
}


  return <>
<form >
<label htmlFor="verificationEmail" className='h3 fw-bolder mb-3'> please enter your verification code</label>
    <input type="text" id='verificationEmail' className='form-control' onInput={(e)=>setCode(e.target.value)}  placeholder='Code' />
    {error?<p className='alert alert-danger mt-2'>{error?.response?.data.message}</p> :''}
    <Link className='btn btn-outline-success mt-2'  to={code && response?'/reset-password':''}
    onClick={()=>verifyCode()}>code</Link>

</form>
  </> 
}
