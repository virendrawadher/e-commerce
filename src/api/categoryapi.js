import axios from "axios"

const CategoryApi = async() => {
    try{
        const {data: {dBCategory}} = await axios.get("https://e-commerce.virendrawadher.repl.co/category")

        return dBCategory

    }catch(error){
        return error
    }
}

export default CategoryApi