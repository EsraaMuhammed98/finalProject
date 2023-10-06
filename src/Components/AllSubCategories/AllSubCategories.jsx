import React from 'react';
import styles from './AllSubCategories.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export default function AllSubCategories() {
  let {id} = useParams()

async function getAllSubCategoris(allId){
  return await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${allId}/subcategories`)
}
let {data} = useQuery('AllSubCategories' ,()=>getAllSubCategoris(id))
  return <>
    <h1 className='logo animate__animated animate__flip logo'>AllSubCategories</h1>
    <div className="row g-5 my-5">
      {
        data?.data.data.map((element)=>
      <>
        <div className="col-md-4">
      <Link to={`/spacificsubcategories/${element._id}`}>
        <div className="product bg-main-light text-main text-center px-3 py-5">
          <h4>{element.name}</h4>
        </div>
      </Link>
      </div>
      </>  
      )
      }
    </div>
  </>
}
