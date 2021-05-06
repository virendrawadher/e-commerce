import {createContext, useContext, useState, useEffect} from "react"
import axios from "axios"
import { useCartProd } from "./CartProdContext"

export const WishListContext = createContext()

export const WishListProvider = ({children}) => {
    const [wishList, setWishList] = useState([])
    const {setShowLoader} = useCartProd()

    useEffect(() => {
        try{
          (async function(){
            setShowLoader(true)
            const {data} = await axios.get("https://e-commerce.virendrawadher.repl.co/wishlist")
  
            setWishList(wishL => wishList.concat(data.wishlist))
            setShowLoader(false)
          }
    
          )()
        }catch(error){
          setShowLoader(false)
          console.log(error)
        }
      }, [])

    return (
        <WishListContext.Provider value = {{wishList, setWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

export const useWishList = () => {
    return useContext(WishListContext)
}