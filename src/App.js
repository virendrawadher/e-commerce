import './App.css';
import axios from "axios";
import { useEffect} from 'react';
import { useAuth } from './context/authcontextprovider'
import {useCartProd} from "./context/CartProdContext"
import {useToast} from "./context/toastContext"
import {Product} from "./pages/product"
import { Cart } from "./pages/cart"
import {WishList} from "./pages/wishList"
import {Routes, Route} from "react-router-dom";
import { Home } from './pages/home';
import { NavBar } from './pages/navbar'
import Register from './pages/register';
import PrivateRoute from './privateroute/privateroute';
import SignIn from "./pages/signin"
import ProductDetails from './pages/productdetails';
import "react-toastify/dist/ReactToastify.css";


function App() {

  const {dispatch, setShowLoader} = useCartProd();
  const {isLogin, setIsLogIn } = useAuth()
  const { ToastContainer} = useToast()

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


  useEffect(() => {
    const getLoginFromLocalStorage = JSON.parse(localStorage.getItem("login"))
    console.log(getLoginFromLocalStorage)
    getLoginFromLocalStorage?.isUserLogin && setIsLogIn(true)
  }, [])

  return (
    <div className="App">
      <NavBar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/category/products/:categoryId' element = {<Product/>}/> 
          <Route path = '/product/:productId' element = {<ProductDetails/>}/>
          <PrivateRoute path='/cart' element = {<Cart/>} isLogin = {isLogin}/>
          <PrivateRoute path='/wishlist' element = {<WishList/>} isLogin = {isLogin}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path = "/login" element = {<SignIn/>}/>
        </Routes>

      <ToastContainer/>
    </div>
  );
}

export default App;
