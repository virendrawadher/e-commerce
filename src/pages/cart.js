import {useEffect, useState} from "react"
import { useCart } from "../cartContext";
import { useCartProd } from "../CartProdContext";
import styles from "../css/style.module.css"
import { CgCloseO } from "react-icons/cg"
import axios from "axios";
import Loader from "react-loader-spinner"
import { useToast } from "./toastContext";

export function Cart(){

    const {showLoader, setShowLoader} = useCartProd();
    const {saveCart, setSaveCart} = useCart()
    const {toast} = useToast()
    // const [cart, setCart] = useState([])

    // useEffect(() => {
    //   try{
    //     (async function(){
    //       setShowLoader(true)
    //       const {data} = await axios.get("https://e-commerce.virendrawadher.repl.co/cart")
    //       console.log(data)
    //       data.cart && setSaveCart(cart => saveCart.concat(data.cart))
    //       setShowLoader(false)
          
    //     }
    //     )() 
        
    //   }catch(error){
    //     setShowLoader(false)
    //     console.log(error)
    //   }
    // }, [])

    const removeItem = async(cartP) => {
      const findRemoveItem = saveCart.find(cart => cart._id === cartP._id)
      console.log(findRemoveItem)

      const removeFromDb = await axios.delete(`https://e-commerce.virendrawadher.repl.co/cart/${findRemoveItem.product_id}`)

      const productQuantity = await axios.post(`https://e-commerce.virendrawadher.repl.co/product/${findRemoveItem.product_id}`, {
        quantity: 1
      })

      console.log({productQuantity})
      console.log(removeFromDb)
      setSaveCart(prevItem => saveCart.filter(car => car._id !== cartP._id))
      toast(`${cartP.cart_name} removed from cart`, {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true
      })
    }

    console.log({saveCart})

    return (
        <div className = {styles.productcontainer} style = {{display: "block"}}>
          {
            showLoader ? <Loader type = "Puff" color = "#EF4444" width = {100} height = {100} className = {styles.loader}/> : (
              saveCart.length === 0 ? 
                <div>No product in cart</div> : 
                <table className = {styles.tablecart}>
            <tr>
              <td></td>
              <td></td>
              <th className = {styles.cartproducttitle}>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>SubTotal</th>
            </tr>

              {
                saveCart.map((cartP) => {
                    return (
                        <tr className = {styles.cartrow}>
                          <td className = {styles.removefromcart} 
                          onClick = {() => removeItem(cartP)} ><CgCloseO/></td>
                          <td><img src = {cartP.cart_image_url} alt = {cartP.cart_name} width = "100px" height = "100px"/></td>
                          <td>{cartP.cart_name}</td>
                          <td>{cartP.quantity}</td>
                          <td>{cartP.price}</td>
                          <td>{(parseInt(cartP.quantity, 10)*parseInt(cartP.price, 10))}</td>
                        </tr>
                    )
                })
              }
          </table>
            )

          }
        </div>
    )
  }