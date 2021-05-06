import React from "react"
import { Link } from "react-router-dom"
import { useCartProd } from "../context/CartProdContext"
import styles from "../css/style.module.css"
import Loader from "react-loader-spinner"


export function Home(){

    const {state, showLoader, setByCategory} = useCartProd()

    console.log(state.category)

    return(
        <div>
            {
                showLoader ? <Loader type = "Puff" color = "#EF4444" width = {100} height = {100} className = {styles.loader}/> : <div className = {styles.homecontainer}>
            <div className = {styles.hometitle}>Home</div>
            <div className = {styles.categorywrapper}>
            {
                state.category.map((category) => {
                    return(
                        <div className = {styles.categorycard}>
                            <Link to={`/category/products/${category._id}`} onClick = {() => setByCategory(true)} style = {{textDecoration: "none" ,color: "#374151"}}>
                                <div className = {styles.category}>
                                    <h4 className = {styles.categorytitle}>{category.category_name}</h4>
                                    <img src={category.category_image_url} alt={category.category_name} className = {styles.categoryimage}/>
                                    {/* <span>{category.description}</span> */}
                                </div>
                            </Link>
                        </div>
                    )
                })
            }

            </div>
        </div>
            }
        </div>
        
    )

}
