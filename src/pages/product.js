import { useCartProd, getPriceRangeData, getSortedData } from "../CartProdContext";
import {NavLink} from "react-router-dom"

export function Product() {

    const {state, dispatch} = useCartProd();
    
    let sortedData = getSortedData(state.products, state.sortBy)
    
    let priceRangeData = getPriceRangeData(sortedData, state.price_range)
    

    return (
      <>
        <h1>Products</h1>
        <label><input type = "radio" name = "sort" value = {state.sortBy} onChange = {() => dispatch({type: "SORT", payLoad: "PRICE_HIGH_TO_LOW"})} checked = {state.sortBy && state.sortBy === "PRICE_HIGH_TO_LOW"}/> HIGH TO LOW</label>{" "}||
        <label><input type = "radio" name = "sort" value = {state.sortBy} onChange = {() => dispatch({type: "SORT", payLoad: "PRICE_LOW_TO_HIGH"})} checked = {state.sortBy && state.sortBy === "PRICE_LOW_TO_HIGH"}/> LOW TO HIGH</label>{" "}||
        <label>Price Range:- <input type = "range" min = "0" max = "1000" value = {state.price_range} onChange = {(e) => dispatch({type: "PRICE_RANGE", payLoad: e.target.value})}/></label>
        <button onClick = {() => dispatch({type: "RESET"})}>RESET</button>
        {
          priceRangeData.map((product) => {
            return (
              <div style = {{border: "1px solid black"}}>
                {/* <img src = {product.image} alt= {product.name}/> */}
                <p key = {product.id}>{product.name}</p>
                <span>{product.price}</span>{" "} <br/>
                <button onClick = {() => dispatch({type: "CART", product})}>{product.isInCart ? <NavLink to = '/cart' activeStyle = {{color: "red"}} style = {{textDecoration: "none"}}>Go to Cart</NavLink> : "Cart"}</button>{" "}
                <button onClick = {() => dispatch({type: "WISHLIST", product})}>{product.isThereInWishList ? "Wishlist": "UnWishList"}</button>
              </div>
            )
          })
        }
      </>
    )
  }