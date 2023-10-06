import React, { useState } from 'react';
import styles from './ChangeMyPassword.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function ChangeMyPassword() {
 let [curentPass,setCurentPass] = useState('')
 let [password,setPassword] = useState('')
 let [rePassword,setRePassword] = useState('')

async function changePassword(){
  // console.log()

  return await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,{
    "currentPassword":curentPass,
    "password":password,
    "rePassword":rePassword
},{headers}).then((res)=>console.log(res)).catch((e)=>console.log(e))

}

  let headers={
    token:localStorage.getItem('token')
  }
  
  return <>
   <div className='box'>
   <div className="boxContent  ">
   <h1 className='text-center'>ChangeMyPassword</h1>

    <form>
      <label htmlFor="currentPass">Current Password</label>
      <input type="password" name="currentPass"
       placeholder='Current Password' className='form-control' 
       onInput={(e)=>setCurentPass(e.target.value)}
   id="currentPass" />



      <label htmlFor="password">Password</label>
      <input type="password" name="password" 
       onInput={(e)=>setPassword(e.target.value)}

       id="password" placeholder='Password' className='form-control' />


      <label htmlFor="rePassword">rePassword</label>
      <input type="password" name="rePassword" 
       onInput={(e)=>setRePassword(e.target.value)}

        id="rePassword" placeholder='re Password' className='form-control' />

      <Link  type='submit'  className='btn btn-outline-success d-block w-50 mx-auto' onClick={changePassword}>Change Password</Link>
   
   
    </form> 
   </div>
   </div>
  </>
}
