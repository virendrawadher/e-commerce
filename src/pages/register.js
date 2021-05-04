import axios from "axios"
import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./authcontextprovider"
import { Home } from "./home"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)
    const {setIsSignUp} = useAuth()
    const navigate = useNavigate()

    const signUpHandler = async() => {
        const {data, status} = await axios.post("https://e-commerce.virendrawadher.repl.co/register", {
            name: name, 
            email: email,
            password: password
        })
        if(data.success){
            setIsSignUp(true)
            setMessage(data.message)
            navigate("/login")
        }else{
            setIsSignUp(false)
            setMessage(data.message)
        }

    }

    return (
        <div>
            <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder = "Enter the name"/>
            <input type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter the email"/>
            <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = "Enter the password"/>
            <button onClick = {signUpHandler}>Sign Up</button>
            <div>{message}</div>
            {/* {
                setTimeout(() => {
                    return <div>{message}</div>
                }, 2000)
            } */}
        </div>
    )

}

export default Register