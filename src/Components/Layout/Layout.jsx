import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { MainNav } from '../Navbar/MainNav';
import { useState ,useContext} from 'react';

import { userContext } from '../../Context/userContext';
import { useEffect } from 'react';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
export default function Layout() {
  let {userToken,setUserToken}= useContext(userContext)
  
  let scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowButton(false);
  };
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  
  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      setUserToken(localStorage.getItem('token'))
 }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

   
  },[])
   return <>
  <Navbar/>
 
  <div className={!<NotFound/>? "container" :''}>
  <Outlet></Outlet>

{showButton &&<button onClick={scrollToTop} className='up btn btn-outline-success p-2 rounded-circle'>Up</button>}
  </div>
  <Footer/>
  </>
}
