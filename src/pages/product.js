import { useCartProd, getPriceRangeData, getSortedData } from "..//context/CartProdContext";
import {Link, NavLink, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "../css/style.module.css"
import { FaHeart } from "react-icons/fa" 
import { useAuth } from "../context/authcontextprovider";
import Loader from "react-loader-spinner";
import axios from "axios"
import { useWishList } from "../context/wishlistcontext";
import { useToast } from "../context/toastContext";

export function Product() {

    const {categoryId} = useParams()
    console.log(categoryId)

    const {state, dispatch, showLoader, setShowLoader} = useCartProd();
    const {wishList, setWishList} = useWishList()
    const {isLogin} = useAuth();
    const [products, setProducts] = useState([])
    const {toast} = useToast()

    useEffect(() => {
      try{
        (async function(){
          setShowLoader(true)
          const {data : {productByCategory}} = await axios.get(`https://E-Commerce.virendrawadher.repl.co/product/category/${categoryId}`)
          setProducts(prod => products.concat(productByCategory))
          setShowLoader(false) 
        }
        )()  
      }catch(error){
        setShowLoader(false)
        console.error(error)
      }
    
    }, [])

    const addToWishList = async(product) => {
      console.log(product)
      if(isLogin){
        let checkInWishList = wishList.findIndex(wishL => wishL.product_id === product._id)

        console.log({checkInWishList})
        if(checkInWishList === -1){
          const {data} = await axios.post("https://E-Commerce.virendrawadher.repl.co/wishlist", {
              product_id: product._id,
              product_name: product.product_name,
              product_image_url: product.product_image_url,
              isiInWishList: true,
              price: product.price

          })
          const response = await axios.post(`https://E-Commerce.virendrawadher.repl.co/product/${product._id}`, {
            isiInWishList: true
          })
          console.log("inside product", {response})
          if(data.success){
            console.log({data})
            setProducts(prod => 
              prod.map((pro) => 
                pro._id === product._id ? {...pro, isiInWishList: true} : pro
              )
              )
            setWishList(wish => wishList.concat(data.saveWislist))
            
          }
          toast(`${product.product_name} added to wishlist`, {
            type: "success",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar:true
          })
        }else{
          const response = await axios.delete(`https://E-Commerce.virendrawadher.repl.co/wishlist/${product._id}`)
          const res = await axios.post(`https://E-Commerce.virendrawadher.repl.co/product/${product._id}`, {
            isiInWishList: false
          })
          if(response.data.success){
            setProducts(prod => 
              prod.map((pro) => 
                pro._id === product._id ? {...pro, isiInWishList: false} : pro

                )
              )
              setWishList(wishL => wishList.filter(wish => wish.product_id !== product._id))
          }
          toast(`${product.product_name} removed from wishlist`, {
            type: "warning",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar:true
          })
        }

      
      }else{
        toast("Sign in to add to wishlist", {
          type: "warning",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true
        })
      }
    }
    
    let sortedData = getSortedData(products, state.sortBy)
    
    let priceRangeData = getPriceRangeData(sortedData, state.price_range)
    
    console.log({products})
    console.log({wishList})
    return (
      <div>
        {
          showLoader ? <Loader type = "Puff" color = "#EF4444" width = {100} height = {100} className = {styles.loader}/> : 
          <div className = {styles.productcontainer}>
        {/* <h1>Products</h1> */}
        <div className = {styles.productfilter}>
          <div className = {styles.filtertitle}>Filters</div>
          <div className = {styles.hightolow}>
            <label>
              <input type = "radio" name = "sort" value = {state.sortBy} onChange = {() => dispatch({type: "SORT", payLoad: "PRICE_HIGH_TO_LOW"})} checked = {state.sortBy && state.sortBy === "PRICE_HIGH_TO_LOW"} className = {styles.inputcs}/> HIGH TO LOW
            </label>
          </div>
          <div className = {styles.lowtohigh}>
            <label>
              <input type = "radio" name = "sort" value = {state.sortBy} onChange = {() => dispatch({type: "SORT", payLoad: "PRICE_LOW_TO_HIGH"})} checked = {state.sortBy && state.sortBy === "PRICE_LOW_TO_HIGH"} className = {styles.inputcs}/> LOW TO HIGH
            </label>
          </div>
          <div className = {styles.pricerange}>
            <label>Price Range:- <br/><input type = "range" min = "400" max = "20000" value = {state.price_range} onChange = {(e) => dispatch({type: "PRICE_RANGE", payLoad: e.target.value})} className = {`${styles.pricerangeslider} ${styles.inputcs}`}/></label>
            <div className = {styles.pricerangevalue}>{state.price_range}</div>
          </div>
          <button className = {styles.resetbutton} onClick = {() => dispatch({type: "RESET"})}>Clear All</button>
        </div>

        <div className = {styles.productlisting}>
          {
            priceRangeData.map((product) => {
              return (
                <div style = {{border: "1px solid black"}} className = {styles.productcard}>
                  <Link to = {`/product/${product._id}`} className = {styles.productlink}>
                    <img src = {product.product_image_url} alt= {product.product_name} className = {styles.productimage}/>

                    <div key = {product._id} className = {styles.productname}>{`${product.product_name.slice(0, 27)}...`}</div>

                    <span className = {styles.productprice}>&#8377;{" "}{product.price}</span>
                  </Link>
                  <NavLink to = "">
                    <FaHeart onClick = {() => addToWishList(product)} className = { (isLogin && product.isiInWishList) ? styles.unwishlist : styles.wishlist}/>
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      </div>
        }
      </div>
      
    )
  }