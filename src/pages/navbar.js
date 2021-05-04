import React from "react";
import {NavLink, Route, Routes} from "react-router-dom"
import {FaIndent} from "react-icons/fa"
import styles from "../css/style.module.css"
import { FaLock, FaShoppingCart, FaHeart } from "react-icons/fa"
import { useCartProd } from "../CartProdContext";
import { useAuth } from "./authcontextprovider";
import { SignOut } from "./signout"
import { useCart } from "../cartContext";
import { useWishList } from "./wishlistcontext";
import { useToast } from "./toastContext";


export function NavBar(){

    const {state} = useCartProd()
    const {isLogin} = useAuth()
    const {saveCart} = useCart()
    const {wishList} = useWishList()
    const { toast } = useToast()

    const wishListLogInHandler = () => {
        if(!isLogin){
            toast("Please sign in to view wishlist and cart", {
                type: "warning", 
                position: "bottom-right",
                autoClose: 3000, 
                hideProgressBar: true
            })
        }
    }
    return (
        <div>
            <header className = {styles.navheader}>
                <nav className = {styles.nav_bar}>
                    <NavLink to = "/" className = {styles.title}>rohaniCart</NavLink>
                    <NavLink to = "/product" className = {styles.navproduct}>Product</NavLink>
                    <NavLink to = "/" activeClassName = {styles.navIcon}><FaIndent size = {30}/></NavLink>
                    <NavLink to = {isLogin ? "/cart" : ""} className = {styles.navcart} onClick = {wishListLogInHandler}>
                        <FaShoppingCart className = {styles.carticon}/>
                        {isLogin && <div className = {styles.cartlength}>   <span className = {styles.cartnumber}>{saveCart.length}</span>
                        </div>}
                    </NavLink>
                    <NavLink to = { isLogin ? "/wishlist" : ""} className = {styles.navwishlist} onClick = {wishListLogInHandler}>
                        <FaHeart className = {styles.carticon}/>
                        {isLogin && <div className = {styles.wishlistlength}> <span className = {styles.wishlistnumber}>{wishList.length}</span></div>} 
                    </NavLink>
                    {
                        isLogin ? <SignOut/> : 
                        <NavLink to = "/login" className = {styles.navlogin}> 
                            <FaLock className = {styles.loginicon}/>
                            <span className = {styles.login}>Login</span>
                        </NavLink>
                    }
                </nav>
            </header>
        </div>
    )
}