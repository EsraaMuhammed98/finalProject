import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { MainNav } from '../Navbar/MainNav';
import { useState } from 'react';
export default function Layout() {
   return <>
  <Navbar/>
 
  <div className="container">
  <Outlet></Outlet>

  </div>
  </>
}
