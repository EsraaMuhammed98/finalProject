import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  let[email,setEmail]=useState(null)
  let[password,setPassword]=useState(null)
  async function resetPassword(){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
      email:email,
      newPassword:password
    }).then((res)=>res).catch((e)=>e)
  }
  let {data} = useQuery('resetPassword',resetPassword)
  return <>
<div className="box">
   <div className="boxContent">
<h1 className='text-center'>Reset Password</h1>
    
<div className='mt-5'>
<label htmlFor="email">Enter Your Email</label>
<input type="email" id='email' placeholder='Enter Your Email' className='mt-2 form-control' onChange={(e)=>setEmail(e.target.value)} />
</div>

<div className='mt-3'>
<label htmlFor="password">Enter Your New Password</label>  
<input type="password" id='password' placeholder='Enter New Password' className='mt-2 form-control' onChange={(e)=>setPassword(e.target.value)}/>
</div>
<Link type='button' to='/login' className='btn btn-outline-success mt-3 d-flex mx-auto' onClick={()=>resetPassword()}>Reset</Link>
 
   </div>
</div>
</>
}
