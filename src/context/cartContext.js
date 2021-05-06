import {useContext, createContext, useState, useEffect} from "react"
import { useCartProd } from "./CartProdContext"
import axios from "axios"

const CartContext = createContext()

export const CartProvider = ({children}) => {

    const [saveCart, setSaveCart] = useState([])
    const {setShowLoader} = useCartProd()

    useEffect(() => {
        try{
          (async function(){
            setShowLoader(true)
            const {data} = await axios.get("https://e-commerce.virendrawadher.repl.co/cart")
            console.log(data)
            data.cart && setSaveCart(cart => saveCart.concat(data.cart))
            setShowLoader(false)
            
          }
          )() 
          
        }catch(error){
          setShowLoader(false)
          console.log(error)
        }
      }, [])

    return(
        <CartContext.Provider value = {{saveCart, setSaveCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}