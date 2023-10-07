import React, { useContext, useState } from 'react';
// import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { useEffect } from 'react';
import Products from '../Products/Products';
import { MainNav } from './MainNav';
import { userContext } from '../../Context/userContext';
export default function Navbar() {
  let {userToken,setUserToken} = useContext(userContext)
  let navigate =useNavigate()

  function logOut(){
    localStorage.removeItem('token')
    setUserToken(null)
    navigate('/login')
  }
  return <>
    <nav className="navbar navbar-expand-lg flex-wrap bg-body-tertiary ">
        
      <div className="container">
      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      <MainNav />
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          {userToken !== null?
          <>
            <li className="nav-item">
              <NavLink activeclassname="active-link"    className='nav-link' to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active-link "className='nav-link' to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active-link "className='nav-link' to="/brands">Brands</NavLink>
            </li>
        
            <li className="nav-item">
              <NavLink activeclassname="active-link " className='nav-link' to="/subcategories">SubCategories</NavLink>
            </li>
            </>
           :''}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           {userToken !== null ?
                  <> 
                             <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
                  <li className="nav-item">
                     <Link className="nav-link mx-2" onClick={()=>logOut()}>Logout</Link>
                   </li>
                   </>:
           <>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li> 
            </>
             }

          

          </ul>

        </div>
      </div>
    </nav>
  </>
} 
