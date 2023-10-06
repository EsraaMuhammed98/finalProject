import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
 
export default function CategorySlider() {
    var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay:true
};
function getCategory(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
  let {data} =useQuery('CategorySlider' , getCategory)
 
   return <>
   {data?.data.data ? <Slider {...settings}> 
   {data?.data.data.map((category)=><img key={category._id} src={category.image} className='w-100' height={220}/>)} 
   </Slider>
   :''}

</>
}