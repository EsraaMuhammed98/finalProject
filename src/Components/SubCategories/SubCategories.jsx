import React from 'react';
import styles from './SubCategories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function SubCategories() {
  async function getSubCategories(){
    return await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
  }

  let {data} = useQuery('SubCategories' , getSubCategories)
  console.log(data)
  return <>
    <h1 className='logo animate__animated animate__flip logo'>SubCategories</h1>
    <div className="row gy-5 my-5">
    {
data?.data.data.map((subCat)=>
        <div className="col-md-3" key={subCat._id}>
      <Link to={`/spacificsubcategories/${subCat._id}`}>
      <div className="product">
          <h4 className='h6 bg-light px-3 py-5 text-main text-center cursor-pointer brdr'>  {subCat.name}</h4>
          </div>
      </Link>
        </div>

)
    }
    </div>
  </>
}
