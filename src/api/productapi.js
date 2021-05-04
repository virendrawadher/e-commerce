import axios from "axios"
import { useParams } from "react-router"

const ProductApi = async() => {
    try{
        
        const {data: {findProduct}} = await axios.get("https://e-commerce.virendrawadher.repl.co/product")

        return findProduct

    }catch(error){
        return error
    }
}

export default ProductApi