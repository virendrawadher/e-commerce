import {useReducer, useContext, createContext, useState} from "react";
import { useAuth } from "./pages/authcontextprovider";
export const CartProdContext = createContext();


export const CartProdProvider = ({children}) => {
    // const {isLogin} = useAuth()
    // console.log(isLogin)
    const [showLoader, setShowLoader] = useState(false)
    const [byCategory, setByCategory] = useState(false)
    const [state, dispatch] = useReducer(productReducer, {products: [], category: [], cart: [], wishList: [], sortBy: null, price_range: 0})
    
    // console.log(state.isLogin)
    return (
        <CartProdContext.Provider value = {{state, dispatch, showLoader, setShowLoader, byCategory, setByCategory}}>
            {children}
        </CartProdContext.Provider>
    )
} 

export const useCartProd = () => {
    return useContext(CartProdContext)
}

function productReducer(state, value){

    switch(value.type){
      case "CATEGORY":
          return {...state, category: state.category.concat(value.category)}
      case "PRODUCT":
          return {...state, products: state.products.concat(value.data)}
      case "CART":
        let productQuantity = state.products.map((item) => {
            return item._id === value.productdetail._id ? {...item, quantity: 1, isInCart: !item.isInCart} : item
        })

        let checkInCart = state.cart.findIndex((item) => item._id === value.productdetail._id)

        if(checkInCart === -1){
            let cartArr = state.products.find((item) => item._id === value.productdetail._id)
        
            return {...state, cart: state.cart.concat({...cartArr, quantity: 1}), products: productQuantity}
        }
        return {...state}
        case "WISHLIST":
            // console.log("login", state.isLogin)
            let proArr = state.products.map((pro) => {
                return pro._id === value.product._id ? {...pro, isiInWishList: !pro.isiInWishList} : pro
            })

            let checkWishList = state.wishList.findIndex((item) => item._id === value.product._id)

            if(checkWishList === -1){
                const wishListArr = state.products.find((item) => item._id === value.product._id)
                
                return {...state, products: proArr, wishList: state.wishList.concat(wishListArr)}
            }else{
                return {...state, products: proArr, wishList: state.wishList.filter((item) => item._id !== value.product._id)}
            }
        case "SORT":
            return {...state, sortBy: value.payLoad}

        case "PRICE_RANGE":

            return {...state, price_range: value.payLoad}
        case "RESET":
            return {...state, sortBy: null, price_range: 0}
        
        // case "INCREMENT":

        //     return {...state, cart: state.cart.map((item) => item.id === value.cartP.id ? {...item, quantity: item.quantity + 1}: item
        //     )}
        // case "DECREMENT":
        //     return {...state, cart: state.cart.map((item) => item.id === value.cartP.id ? (item.quantity > 1 ? {...item, quantity: item.quantity -1 }: item): item)}
        default:
            return {...state}
    }
  }

export function getSortedData(productList, sortBy){
    if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
        return [...productList].sort((a, b) => b["price"] - a["price"])
    }
    if(sortBy && sortBy === "PRICE_LOW_TO_HIGH"){
        return [...productList].sort((a, b) => a["price"] - b["price"])
    }
    return productList
}

export function getPriceRangeData(productList, price_range){
   
    if(parseInt(price_range, 10) > 0){
        return productList.filter((item) => parseInt(item.price,10) < parseInt(price_range,10))
    }
    return productList
}
 