import React from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Categories() {

  function getCategories(){
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data} = useQuery('Categories' , getCategories)
  return <>
  <div className='container my-5 py-5'>
      <div className="row g-5 ">
        {data?.data.data.map((category=>
        <div className="col-md-3 " key={category._id}>
          <div className={styles.Category}>
          <Link to={`/allsubCategories/${category._id}`}>
            <img src={category.image} className='w-100 h-75' alt={category.name} />
            <p className='text-center py-4 cursor-pointer text-main'>{category.name} </p>
          </Link>
          </div>
        </div>  
        ))
      }
          
      </div>
  </div>
   </>
}
