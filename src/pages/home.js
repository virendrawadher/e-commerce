import React, {useEffect} from "react"
import { Link } from "react-router-dom"
import CategoryApi from "../api/categoryapi"
import { useCartProd } from "../CartProdContext"
import styles from "../css/style.module.css"
import { useAuth } from "./authcontextprovider"
import { SignOut } from "./signout"
import Loader from "react-loader-spinner"


export function Home(){

    const {state, dispatch, showLoader, setByCategory} = useCartProd()


    // useEffect(() => {
    //     CategoryApi()
    //     .then(category => dispatch({type: "CATEGORY", category}))
    //     .catch(error => console.log(error))
    // }, [])

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
                            <Link to={`/category/products/${category._id}`} onClick = {() => setByCategory(true)}>
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
