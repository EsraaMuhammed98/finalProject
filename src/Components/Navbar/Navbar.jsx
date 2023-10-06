import React, { useContext, useState } from 'react';
// import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { useEffect } from 'react';
import Products from '../Products/Products';
import { MainNav } from './MainNav';
export default function Navbar() {
  return <>
    <nav className="navbar navbar-expand-lg flex-wrap bg-body-tertiary ">
        
      <div className="container">
      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      <MainNav />
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          {localStorage.getItem('token')?<ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          

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
        
          </ul> :''}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           {!localStorage.getItem('token')&&
           <>
           <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
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
