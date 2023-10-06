import React from 'react';
import styles from './SpacificBrand.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function SpacificBrand() {
  let {id} =useParams()
  async function getSpacificBrand(BrandId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${BrandId}`)
  }
 let {data} = useQuery('spacificBrand' , ()=>getSpacificBrand(id))
 console.log(data)
  return <>
  <div className="row d-flex align-items-center bg-light p-5">
    <div className="col-md-4">
<div className="image">
      <img src={data?.data.data.image} className={styles.image} alt={data?.data.data.name} />

</div>
    </div>
    <div className="col-md-8">
      <div className="breand-content">
        <h1><span className='text-main'>Brand : </span>{data?.data.data.name}</h1>
      </div>
    </div>
        <Link className='btn text-white bg-main mt-5' to='/brands'>Back To Brands</Link>
  </div>
  </>
}
