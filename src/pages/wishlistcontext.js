import {createContext, useContext, useState, useEffect} from "react"
import axios from "axios"

export const WishListContext = createContext()

export const WishListProvider = ({children}) => {
    const [wishList, setWishList] = useState([])

    useEffect(() => {
        try{
          (async function(){
            const {data} = await axios.get("https://e-commerce.virendrawadher.repl.co/wishlist")
  
            setWishList(wishL => wishList.concat(data.wishlist))
            
          }
    
          )()
        }catch(error){
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