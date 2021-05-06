import React, {useEffect, useState} from "react"
import { useCartProd } from "../context/CartProdContext"
import styles from "../css/style.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import {FaMinus, FaPlus} from "react-icons/fa"
import Loader from "react-loader-spinner"
import { useCart } from "../context/cartContext"
import { useAuth } from "../context/authcontextprovider"
import { useToast } from "../context/toastContext"

const ProductDetails = () => {

    const {saveCart, setSaveCart} = useCart()
    const { isLogin } = useAuth()
    const { toast } = useToast()
    const [productById, setProductById] = useState({})
    const [loader, setLoader] = useState(false)


    const {productId} = useParams();

    console.log({productId})

    useEffect(() => {
        try{
            (async function(){
                setLoader(true)
                const {data: {product}} = await axios.get(`https://e-commerce.virendrawadher.repl.co/product/${productId}`)
                setProductById(product)
                setLoader(false)
            }
            )();
        }catch(error){
            setLoader(false)
            console.log(error)
        }
    },[])


    // useEffect(() => {
    //     try{
    //         (async function(){
    //             setShowLoader(true)
    //             const {data} = await axios.get(`https://e-commerce.virendrawadher.repl.co/cart`)
    //             console.log({data})
    //             setSaveCart(carts => saveCart.concat(data.cart))
    //             setShowLoader(false)
    //         }
    //         )();
    //     }catch(error){
    //         setShowLoader(false)
    //         console.log(error)
    //     }
    // },[])

    const decrementHandler = () => {
        setProductById(productById.quantity > 1 ? {...productById, quantity: productById.quantity-1}: productById)
    }

    const incrementHandler = () => {
        setProductById({...productById, quantity: productById.quantity+1})
    }

    const cartHandler = async() => {
        if(isLogin){
            let cartProduct = saveCart.findIndex(cart => cart.product_id=== productById._id)
            console.log({cartProduct})
    
            let cartQuantity = saveCart.find(car => car.product_id === productById._id)
            console.log({cartQuantity})
    
    
            if(cartProduct === -1){
                console.log(productById._id)
                const {data} = await axios.post("https://e-commerce.virendrawadher.repl.co/cart", {
                    product_id: productById._id,
                    cart_name: productById.product_name,
                    cart_image_url: productById.product_image_url,
                    price: productById.price,
                    quantity: productById.quantity,
                    isInCart: productById.isInCart,
                    isInWishList: productById.isiInWishList
                })
    
                const response = await axios.post(`https://e-commerce.virendrawadher.repl.co/product/${productById._id}`, {
                        quantity: productById.quantity
                })
                console.log({data})
                console.log({response})
                if(data.success){
                    setSaveCart(carts => saveCart.concat(data.newCart))
                }else{
                    console.error("Not data")
                }
                // setSaveCart(carts => saveCart.concat(productById))
            }else{
                if(cartQuantity.quantity !== productById.quantity){
                    const {data} = await axios.post(`https://e-commerce.virendrawadher.repl.co/cart/${productById._id}`, {
                        product_id: productById._id,
                        cart_name: productById.product_name,
                        cart_image_url: productById.product_image_url,
                        price: productById.price,
                        quantity: productById.quantity,
                        isInCart: productById.isInCart,
                        isInWishList: productById.isiInWishList
                    })
    
                    const response = await axios.post(`https://e-commerce.virendrawadher.repl.co/product/${productById._id}`, {
                        quantity: productById.quantity
                    })
    
                    console.log({response})
                    console.log({data})
                    if(data.success){
                        setSaveCart(prevItem => 
                            prevItem.map((item) => {
                                return item.product_id === productById._id ? {...item, quantity: productById.quantity} : item
                            })
                            )
                    }
                }
    
            }
            toast(`${productById.product_name} added to cart`, {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true
            })
        }else{
            toast('Sign in to add product to cart', {
                type: "warning",
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true
            })
        }
        
    }
    console.log({productById})
    
    console.log({saveCart})
    return(
        // <div>1234</div>
        <div>
            { loader ? <Loader type = "Puff" color = "#EF4444" width = {100}
                height = {100} className = {styles.loader}
            /> : 
        
            <div className = {styles.productcontainer}>
                <div className = {styles.productdetailcontainer}>
                    <img src = {productById.product_image_url} alt = {productById.product_name} className = {styles.productdetailimage}/>
                    <div className = {styles.productdetailwrapper}>
                        <div className = {styles.productdetailname}>{productById.product_name}</div>

                        <div className = {styles.productdetailprice}>&#8377;{" "}{productById.price}</div>

                        <div className = {styles.productdetaildescription}>
                            {productById.description}
                        </div>
                        <div className = {styles.productquantity}>
                            <FaMinus onClick = {decrementHandler} className = {styles.decrementbtn}/>
                            <span className = {styles.productquantitynumber}>{productById.quantity}</span>
                            <FaPlus onClick = {incrementHandler} className = {styles.incrementbtn}/>
                        </div>
                        <button  onClick = {() => cartHandler(productById)} className = {styles.cartbutton}>ADD TO CART</button>
                        
                    </div>
                </div>
            </div>
            }
            {/* () => dispatch({type: "DECREMENT", productById}) */}
        </div>

    )

}

export default ProductDetails