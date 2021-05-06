import {useReducer, useContext, createContext, useState} from "react";
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
        case "SORT":
            return {...state, sortBy: value.payLoad}

        case "PRICE_RANGE":

            return {...state, price_range: value.payLoad}
        case "RESET":
            return {...state, sortBy: null, price_range: 0}
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
 