
import {useWishList} from "../context/wishlistcontext"
import axios from "axios"
import styles from "../css/style.module.css"
import { useToast } from "../context/toastContext"
import { CgCloseO } from "react-icons/cg"
import Loader from "react-loader-spinner"
import { useCartProd } from "../context/CartProdContext"

export function WishList(props){

    const {wishList, setWishList} = useWishList()
    const { showLoader } = useCartProd()
    const {toast} = useToast() 

    const removeFromWishList = async(product) => {
      const findItemToRemove = wishList.find(wish => wish.product_id === product.product_id)
      if(findItemToRemove){
        const response = await axios.delete(`https://E-Commerce.virendrawadher.repl.co/wishlist/${product.product_id}`)
      
      const res = await axios.post(`https://E-Commerce.virendrawadher.repl.co/product/${product.product_id}`, {
        isiInWishList: false
      })
        if(response.data.success){
          setWishList(wishL => wishList.filter(wish => wish.product_id !== product.product_id))
        }
        toast(`${product.product_name} removed from wishlist`, {
          type: "warning",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar:true
        })
    }
  }

    return (
        <div>
        {
          showLoader ? <Loader type = "Puff" width = {100} height = {100} color = "#EF4444" className = {styles.loader}/> : 
        
          <div className = {styles.productcontainer} style = {{margin: "0 auto", justifyContent: "center", fontSize: "2rem"}}>
          {
            wishList.length === 0 ? <div>Wishlist is empty</div> : 
            <div>
              <h5>My WishList</h5>
              {
                wishList.map((product) => {
                    return (
                        <div>
                          <div className = {styles.wishlistcontainer}>
                              <img src = {product.product_image_url} alt = {product.product_name} width = "300px" height = "200px"/>
                              <div className = {styles.wishlistdesp}>
                                <div key = {product._id} className = {styles.productdetailname} style = {{fontSize: "1rem", fontWeight: "500", width: "80%"}}>{product.product_name}</div>{" "}
                                <div className = {styles.productdetailprice}>&#8377; {product.price}</div>
                                <CgCloseO onClick = {() => removeFromWishList(product)} className = {styles.removeFromWishList}/>
                              </div>
                          </div>
                        </div>

                    )
                })
              }
            </div>
          }
            
          </div>
        }
        </div>
    )
  }