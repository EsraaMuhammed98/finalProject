import React from 'react';
// import styles from './MainSlider.module.css';
import slid1 from '../../Assets/images/slider-image-1.jpeg'
import slid2 from '../../Assets/images/slider-image-2.jpeg'
import slid3 from '../../Assets/images/slider-image-3.jpeg'
import slid4 from '../../Assets/images/slider-2.jpeg'
import slid5 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick';
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  return <>
  <div className="container">
<div className="row gx-0 my-5">
  <div className="col-md-9">
    <Slider {...settings}>
    <img src={slid3} alt="" className='w-100' height={400} />
    <img src={slid2} alt="" className='w-100' height={400} />
    <img src={slid1} alt="" className='w-100' height={400} />
    </Slider>
  </div>
  <div className="col-md-3  " >
 <img src={slid4} alt="" className='w-100 rounded-0' height={200}/>
    <img src={slid5} alt="" className='w-100 rounded-0' height={200}/>

  </div>
</div>
</div>
  </>
}
