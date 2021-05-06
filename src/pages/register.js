import axios from "axios"
import {useState} from "react"
import styles from "../css/style.module.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authcontextprovider"
import { useToast } from "../context/toastContext"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)
    const {setIsSignUp} = useAuth()
    const { toast } = useToast()
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
            toast(`${data.message}`, {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true
            })
        }else{
            setIsSignUp(false)
            setMessage(data.message)
            toast(`${data.message}`, {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true
            })
        }

    }

    return (
        <div className = {styles.signinmodal}>
            <div className = {styles.signincontent}>
                <h2>Sign Up</h2>
                <div className = {styles.signindata}>
                    <label style = {{textAlign: "left", marginBottom: "0.2rem"}}>Enter user name</label>
                    <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} style = {{padding: "0.5rem 1rem", borderRadius: "0.2rem", fontSize: "1.2rem", marginBottom: "1rem"}}/>
                    <label style = {{textAlign: "left", marginBottom: "0.2rem"}}>Enter user name</label>
                    <input type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} style = {{padding: "0.5rem 1rem", borderRadius: "0.2rem", fontSize: "1.2rem", marginBottom: "1rem"}}/>
                    <label style = {{textAlign: "left", marginBottom: "0.2rem"}}>Enter user name</label>
                    <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} style = {{padding: "0.5rem 1rem", borderRadius: "0.2rem", fontSize: "1.2rem", marginBottom: "1rem"}}/>
                </div>   
                <button onClick = {signUpHandler} className = {styles.cartbutton}>Sign Up</button>
            </div>
            {/* <div>{message}</div> */}
            {/* {
                setTimeout(() => {
                    return <div>{message}</div>
                }, 2000)
            } */}
        </div>
    )

}

export default Register