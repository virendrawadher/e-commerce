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


function App() {

  const {state, dispatch} = useCartProd();
    useEffect(() => {
      (async function (){
        try{
          const response = await axios.get("/api/products")
          const prod = response.data.products
          dispatch({type: "PRODUCT", prod})
        }
        catch{
          console.log("Error!!!")
        }
      }
      )();
    }, [dispatch]);
  return (
    <div className="App">
      <NavBar/>
      <nav style ={{marginTop: "5rem"}}>
        {/* <Link to = '/'>Product</Link>| |{" "}
        <Link to = '/cart'>Cart</Link>| |{" "}<span>{state.cart.length}</span>{" "}| | */}
        <Link to = '/wishlist' style = {{marginTop: "5rem"}}>WishList</Link>| |<span>{state.wishList.length}</span>
      </nav>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/product' element = {<Product/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/wishlist' element = {<WishList/>}/>
      </Routes>
    </div>
  );
}

export default App;
