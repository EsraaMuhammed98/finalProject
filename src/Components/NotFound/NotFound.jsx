import React from 'react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return <>

    <div className={styles.notFound}>
    <h1>Not Found 404!  <i className="text-danger fa-solid fa-triangle-exclamation"></i></h1>
    </div>
  </>
}
