import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { MainNav } from '../Navbar/MainNav';
import { useState ,useContext} from 'react';

import { userContext } from '../../Context/userContext';
import { useEffect } from 'react';
import NotFound from '../NotFound/NotFound';
export default function Layout() {
  let {userToken,setUserToken}= useContext(userContext)

  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
            setUserToken(localStorage.getItem('token'))
       }
  },[])
   return <>
  <Navbar/>
 
  <div className={!<NotFound/>? "container" :''}>
  <Outlet></Outlet>

  </div>
  </>
}
