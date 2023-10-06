import axios from "axios";
import { createContext } from "react";

export let wishContext = createContext();

export default function WishContextProvider (props){
    let headers={
        token:localStorage.getItem('token')
    }

async function addWish(id){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId:id},{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
}

async function getWishList(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
}

async function deleteFromWishList(id){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers}).then((response)=>
    response
    ).catch((error)=>
    error
    )
} 
return <>
<wishContext.Provider value={{addWish , getWishList , deleteFromWishList}}>
{props.children}

</wishContext.Provider>


</>
}