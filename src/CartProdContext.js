import {useReducer, useContext, createContext} from "react";
export const CartProdContext = createContext();

export const CartProdProvider = ({children}) => {

    const [state, dispatch] = useReducer(productReducer, {products: [], cart: [], wishList: [], sortBy: null, price_range: 0})
    

    return (
        <CartProdContext.Provider value = {{state, dispatch}}>
            {children}
        </CartProdContext.Provider>
    )
} 

export const useCartProd = () => {
    return useContext(CartProdContext)
}

function productReducer(state, value){
    
    switch(value.type){
      case "PRODUCT":
          return {...state, products: state.products.concat(value.prod)}
      case "CART":
        
        let productQuantity = state.products.map((item) => {
            return item.id === value.product.id ? {...item, quantity: 1, isInCart: !item.isInCart} : item
        })

        let checkInCart = state.cart.findIndex((item) => item.id === value.product.id)

        if(checkInCart === -1){
            let cartArr = state.products.find((item) => item.id === value.product.id)
        
            return {...state, cart: state.cart.concat({...cartArr, quantity: 1}), products: productQuantity}
        }
        return {...state}
        case "WISHLIST":
            let proArr = state.products.map((pro) => {
                return pro.id === value.product.id ? {...pro, isThereInWishList: !pro.isThereInWishList} : pro
            })

            let checkWishList = state.wishList.findIndex((item) => item.id === value.product.id)

            if(checkWishList === -1){
                const wishListArr = state.products.find((item) => item.id === value.product.id)
                
                return {...state, products: proArr, wishList: state.wishList.concat(wishListArr)}
            }else{
                return {...state, products: proArr, wishList: state.wishList.filter((item) => item.id !== value.product.id)}
            }
        case "SORT":
            return {...state, sortBy: value.payLoad}

        case "PRICE_RANGE":

            return {...state, price_range: value.payLoad}
        case "RESET":
            return {...state, sortBy: null, price_range: 0}
        
        case "INCREMENT":

            return {...state, cart: state.cart.map((item) => item.id === value.cartP.id ? {...item, quantity: item.quantity + 1}: item
            )}
        case "DECREMENT":
            return {...state, cart: state.cart.map((item) => item.id === value.cartP.id ? (item.quantity > 1 ? {...item, quantity: item.quantity -1 }: item): item)}
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
 