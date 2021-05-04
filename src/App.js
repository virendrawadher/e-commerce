import './App.css';
import axios from "axios";
import { useEffect} from 'react';
import {Product} from "./pages/product"
import { Cart } from "./pages/cart"
import {WishList} from "./pages/wishList"
import {useCartProd} from "./CartProdContext"
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import { NavBar } from './pages/navbar'
import CategoryApi from './api/categoryapi';
import ProductApi from "./api/productapi"
import Register from './pages/register';
import PrivateRoute from './pages/privateroute';
import { useAuth } from './pages/authcontextprovider'
import {useCart} from "./cartContext"
import SignIn from "./pages/signin"
import ProductDetails from './pages/productdetails';
import {useToast} from "./pages/toastContext"
import "react-toastify/dist/ReactToastify.css";


function App() {

  const {state, dispatch, setShowLoader, byCategory} = useCartProd();
  const {isLogin, setIsLogIn} = useAuth()
  const {saveCart, setSaveCart} = useCart()
  const { ToastContainer, toast } = useToast()

  console.log(byCategory)
  console.log({saveCart})
  // console.log({isSignUp})
  useEffect(() => {
    try{
      (async function(){
        setShowLoader(true)
        const {data: {dBCategory}} = await axios.get("https://e-commerce.virendrawadher.repl.co/category")
        dispatch({type: "CATEGORY", category: dBCategory})
        setShowLoader(false)
      }

      )()
    }catch(error){
      setShowLoader(false)
      console.error(error)
    }

  }, [])

  // useEffect(() => {
  //   try{
  //     (async function(){
  //       setShowLoader(true)
  //       const {data: {findProduct}} = await axios.get("https://e-commerce.virendrawadher.repl.co/product")
  //       dispatch({type: "PRODUCT", data: findProduct})
  //       setShowLoader(false) 
  //     }
  //     )()  
  //   }catch(error){
  //     setShowLoader(false)
  //     console.error(error)
  //   }
  
  // }, [])

  useEffect(() => {
    const getLoginFromLocalStorage = JSON.parse(localStorage.getItem("login"))
    console.log(getLoginFromLocalStorage)
    getLoginFromLocalStorage?.isUserLogin && setIsLogIn(true)
  }, [])


    // useEffect(() => {
    //   (async function (){
    //     try{
    //       // const response = await axios.get("/api/products")
    //       // const prod = response.data.products
    //       // dispatch({type: "PRODUCT", prod})
    //     }
    //     catch{
    //       console.log("Error!!!")
    //     }
    //   }
    //   )();
    // }, [dispatch]);
    // CategoryApi().then(data => console.log(data))
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/category/products/:categoryId' element = {<Product/>}/> 
        <Route path = '/product/:productId' element = {<ProductDetails/>}/>
        <PrivateRoute path='/cart' element = {<Cart/>} isLogin = {isLogin}/>
        <PrivateRoute path='/wishlist' element = {<WishList/>} isLogin = {isLogin}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
