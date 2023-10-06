import React from 'react';
import styles from './SpacificSubCategories.module.css';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function SpacificSubCategories() {
  let {id} = useParams();

  async function getSpacificSubCat(spacificSupId){
    return await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories/${spacificSupId}`)
  }
  let {data} = useQuery('spacificSubCategories' ,()=> getSpacificSubCat(id))
  return <>
<div className='bg-main-light p-5 text-main  text-center'>
<h1>{data?.data.data.name}</h1>
<Link className='text-white bg-main btn mt-5 w-100' to='/subcategories'>Back To SubCategories </Link>
</div>
  </>
}
