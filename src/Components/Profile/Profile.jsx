import React from 'react';
import styles from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function Profile() {
  let incodedToken = localStorage.getItem('token')
  let decodedToken = jwtDecode(incodedToken)
  // console.log(decodedToken)
  return <>
    <div className='box'>
        <div className='boxContent text-center'>
        <span className={styles.user}><i className='fas fa-user'></i></span>
        <h1>{decodedToken.name}</h1>
        <h2>Role:{decodedToken.role}</h2>
        <Link className='btn btn-outline-success my-3' to='/change-password'>Change Password</Link>
        </div>
    </div>
  </>
}
