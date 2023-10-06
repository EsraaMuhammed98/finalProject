 
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

export default function SpacificCategory() {
    let params = useParams()
     function getSpacificCategory(id){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    }
    let {data} = useQuery('spacCat' , ()=>getSpacificCategory(params.id))
  console.log(data)
  return <>
  <div className='row'>
      <div className="col-md-4">
        <p>{data?.data.data.name}</p>
      </div>
    </div>
  
  </>
  
}
