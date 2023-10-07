import React  from 'react';
import './Home.module.css'
import CategorySlider from '../CategorySlider/CategorySlider';
import Products from '../Products/Products';
import MainSlider from '../MainSlider/MainSlider';
import { Offline, Online } from "react-detect-offline";
import { useEffect } from 'react';

 

export default function Home() {
  return <>
  <Offline>
<div className='alert alert-warning w-25 mt-2 mx-auto text-center'>
    <i className='fas fa-wifi'></i> Offline!Check your connection.
</div>
    </Offline>

  <MainSlider/>
    <CategorySlider/>
 <Products/>
  </>
}
