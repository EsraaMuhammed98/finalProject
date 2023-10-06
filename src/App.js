import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
// import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import WishList from './Components/WishList/WishList'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import SpacificBrand from './Components/SpacificBrand/SpacificBrand.jsx'
// import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SpacificCategory from './Components/SpacificCategory/SpacificCategory';
import WishContextProvider from './Context/WishListContext';
import SubCategories from './Components/SubCategories/SubCategories';
import SpacificSubCategories from './Components/SpacificSubCategories/SpacificSubCategories';
import AllSubCategories from './Components/AllSubCategories/AllSubCategories';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import CashOrderDetails from './Components/CashOrderDetails/CashOrderDetails';
import ForgetPassword from './Components/Forget-Password/Forget-Password';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ChangeMyPassword from './Components/ChangeMyPassword/ChangeMyPassword';
import MoreInfo from './Components/MoreInfo/MoreInfo';
import Profile from './Components/Profile/Profile';
import AddInfo from './Components/AddInfo/AddInfo';
import UserContextProvider, { userContext } from './Context/userContext';
import { useContext } from 'react';

let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    // {path:'Products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'Cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'spacificproduct/:id' , element:<ProtectedRoute><SpacificCategory/></ProtectedRoute>},
    {path:'Categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'subcategories' , element:<ProtectedRoute><SubCategories/></ProtectedRoute>},
    {path:'Brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'spacificbrand/:id' , element:<ProtectedRoute><SpacificBrand/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'checkout/:p' , element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'cashdetails' , element:<ProtectedRoute><CashOrderDetails/></ProtectedRoute>},
    // {path:'cashorder' , element:<ProtectedRoute><CashOrder/></ProtectedRoute>},
    {path:'spacificsubcategories/:id' , element:<ProtectedRoute><SpacificSubCategories/></ProtectedRoute>},
    {path:'allsubCategories/:id' , element:<ProtectedRoute><AllSubCategories/></ProtectedRoute>},
    {path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'forget-password' , element: <ForgetPassword/> },
    {path:'verify-code' , element: <VerifyCode/>},
    {path:'reset-password' , element:<ResetPassword/>  },
    {path:'change-password' , element:<ProtectedRoute> <ChangeMyPassword/>  </ProtectedRoute>},
    {path:'more-info' , element:<ProtectedRoute> <MoreInfo/>  </ProtectedRoute>},
    {path:'add-info' , element:<ProtectedRoute><AddInfo/></ProtectedRoute>  },
    {path:'Register' , element:<ProtectedRoute><Register/></ProtectedRoute>},
  ] }
])

function App() {
  let {userToken , setUserToken}= useContext(userContext)
  
 if(localStorage.getItem('token') !== null){
      setUserToken(localStorage.getItem('token'))
 }
  return<WishContextProvider>
<CartContextProvider>

  <RouterProvider router={routes}>
  <Toaster/>
  </RouterProvider>
  </CartContextProvider> 
  </WishContextProvider>
}

export default App;
