import React, { useContext,useEffect, useState } from 'react';
// import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext';
import { wishContext } from '../../Context/WishListContext';
import { HashLoader } from 'react-spinners';
import egypt from '../../Assets/images/flagas/egypt.png'
import italy from '../../Assets/images/flagas/italy.png'
import korea from '../../Assets/images/flagas/korea.png'
import japanese from '../../Assets/images/flagas/japan.png'
import france from '../../Assets/images/flagas/ferance.jpg'
import turkey from '../../Assets/images/flagas/turkey.png'
import india from '../../Assets/images/flagas/india.jpg'
import { userContext } from '../../Context/userContext';
   
export const MainNav = (pros) => {

    let countries=[
        {c :"Egypt",i: egypt,id:1 },
        {c :"Italy",i: italy ,id:2},
        {c :"Turkey",i: turkey ,id:3},
        {c :"Japanese",i: japanese ,id:4},
        {c :"Korea",i: korea ,id:5},
        {c :"India",i: india,id:6} ,
        {c :"France",i: france ,id:7},
      
      
      ]
     
    let {getProductFromCart} =useContext(cartContext)
    let {getWishList , deleteFromWishList} =useContext(wishContext)

    let [numOfCartItems , setNumOfCartItems] = useState(null)
    let [wishes , setWishes] = useState([])
    let [loading , setLoading] = useState(true)
    
    
     let [profile , setProfile] = useState({})
     let {userToken , search , setSearch}= useContext(userContext)
     
     async function getNumbersOfCartItems(){
        let {data} =await getProductFromCart()
        setNumOfCartItems(data)
      }
     
      async function getWises(){   
        let {data} =await getWishList()
          setWishes(data)
          setLoading(false)
        }

      async function deleteWish(id){
        // document.querySelector('.wish').classList.toggle('d-none')
        let {data} =await deleteFromWishList(id)
          setWishes(data)
        }
     function handleSearch(e){
      let {value} = e.target
      // let upperWord = value.split(' ').map((word) => word.toCapitalize()+word.substring(1)).join(' ');
      let upperWord = value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        setSearch(upperWord)
        console.log(upperWord)
     }  
      
    useEffect(()=>{
      getWises()
        getNumbersOfCartItems()
      
    },[])
    
  return <>
    <div className="w-100 py-3 d-flex align-items-center ">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
             <input type="search" onChange={handleSearch}    className='form-control w-50' id="" placeholder='Search On Products'    />
                 
                  <div className="dropdown mx-3">
                    <label className=" dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                          Location
                        </label>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                      {countries.map((country)=> <div key={country.id} className="country d-flex justify-content-center p-3">
                      <Link className="dropdown-item" href="#">{country.c}</Link>
                     <img src={country.i} className='w-25' alt={country.c } /> 
                      </div>
                    
                    )}
                    </div>
                  </div> 
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             {userToken?<>

          <li className="nav-item dropdown profile-list me-1">
                <Link className="nav-link dropdown-toggle" role="button" to='#' data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user-pen"></i></Link>
            <ul className='wish dropdown-menu' >
          {
          profile?<> 
<Link to='/profile'>
            <li className='dropdown-item text-center'>
            Profile
            </li>
          </Link>
          <Link to='/change-password'>
            <li className='dropdown-item text-center'>
            ChangePassword
            </li>
          </Link>
          
              <li className='dropdown-item text-center'>
       
<div className="btn-group dropend">
  <Link type="button" className="  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    More Info
  </Link>
  <ul className="dropdown-menu text-center ">
    <li><Link cllinkss="dropdown-item" className='text-main' to="add-info">Add Info</Link></li>
    <li><Link cllinkss="dropdown-item" className='text-main' to="more-info">Show Info</Link></li>
  </ul>
</div>
              </li>
         
              <Link to='/allorders'>
            <li className='dropdown-item text-center'>
            Trak My Orders
            </li>
          </Link>         
          </>
          :<HashLoader cssOverride={{position:'absolute' , left:'50%' , transform:'translateX(-50%)'}} color="#26d7b7" /> }
                </ul>
              </li>


          <li className="nav-item dropdown wish-list me- ">
                <Link className="nav-link dropdown-toggle" role="button" to='/wishlist' data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false" onClick={getWises} ><i className='far fa-heart'></i></Link>
            <ul className='wish dropdown-menu' >
          {!loading&& wishes?<> 
            <li className='dropdown-item'><span className='text-main'>Count :</span> {wishes?.count}</li>
                    {wishes?.data?.slice(0,3).map((w)=><li key={w?.id} className='d-flex justify-content-between py-2 align-items-center'>
                      <div className="info d-flex flex-column">
                      <span>{w.title.split(' ').slice(0,2).join(' ')}</span>
                      {/* <span>{w.brand} EGP</span> */}
                      <span>{w.price} EGP</span>
                  <button className='btn text-danger text-start p-0 my-2 cursor-pointer' onClick={()=>deleteWish(w.id)}>
                  <i className='fa fa-heart-broken pe-1'></i>Delte </button>
                      </div>
                      <img src={w.imageCover} alt={w.name} className='w-25'/>
                      </li>)}
                      
                      <Link className='w-100 boderBtn my-3' to='/wishlist'>See More</Link>
          </>
          :<HashLoader cssOverride={{position:'absolute' , left:'50%' , transform:'translateX(-50%)'}} color="#36d7b7" /> }
                </ul>
              </li>
 
          <li className="nav-item cart">
                <Link className="nav-link" to="/cart">  <i className='fas fa-shopping-cart cart-icon'></i> </Link>
                  <span className='b'>{numOfCartItems?numOfCartItems.numOfCartItems:0}</span>
              </li>

              
              </> 
           :'' }
         </ul>
        </div>
  </>
}
