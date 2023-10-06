import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import styles from './Brands.module.css';
import { Link, useParams } from 'react-router-dom';

export default function Brands() {

  async function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data}= useQuery('getBrands', getAllBrands)
 
  return <>
    <h1 className='animate__animated animate__flip logo'>Brands</h1>
    <div className="row g-4">
      {data?.data.data.map((brand)=>
      <div className="col-md-2" key={brand._id}>
        <div className={styles.brands}>
        <Link to={`/spacificbrand/${brand._id}`}>
          <img src={brand.image} className='w-100' alt={brand.name} />
          <p className='text-center text-main'>{brand.name}</p>
        </Link>
        </div>
      </div>
      )
    }

      </div>
  </>
}
