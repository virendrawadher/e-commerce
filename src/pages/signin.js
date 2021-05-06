import axios from "axios"
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import { useAuth } from "../context/authcontextprovider";
import styles from "../css/style.module.css"
import { useToast } from "../context/toastContext";
const SignIn = (props) => {

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const {toast} = useToast()
    const {setIsLogIn, userName, setUserName, setModal} = useAuth()
    const navigate = useNavigate();

    // useEffect(() => {
    //   const getLoginFromLocalStorage = JSON.parse(localStorage.getItem("login"))
    //   console.log(getLoginFromLocalStorage)
    //   getLoginFromLocalStorage?.isUserLogin && setIsLogIn(true)
    // }, [])

    async function signHandler() {
      const response = await axios.post(
        "https://e-commerce.virendrawadher.repl.co/login",
        {
          email: userName,
          password: password
        }
      );
      if (response.data.success) {
        setIsLogIn(true);
        setUserName("");
        setPassword("");
        setModal(false)
        navigate("/");
        localStorage.setItem("login", JSON.stringify({isUserLogin: true}))
        localStorage.setItem('username', JSON.stringify({userName: userName}))
        toast(`${response.data.message}`, {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true
        })
      } else if (response.data.success === false) {
        setIsLogIn(false);
        setMessage(response.data.message)
        setPassword("");
        toast(`${response.data.message}`, {
          type: "warning",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true
        })
      }
    }
    console.log(userName)
    return (
      <div className = {styles.signinmodal}>
        <div className = {styles.signincontent}>
          <h2>Sign in</h2>
          <div className = {styles.signindata}>
              <label style = {{textAlign: "left", marginBottom: "0.2rem"}}>Enter the email</label>
              {" "}
              <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style = {{padding: "0.5rem 1rem", borderRadius: "0.2rem", fontSize: "1.2rem"}}
              />
            
              <label style = {{textAlign: "left", marginBottom: "0.2rem", marginTop: "1rem"}}>Enter the password</label>
                {" "}
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style = {{padding: "0.5rem 1rem", borderRadius: "0.2rem", fontSize: "1.2rem"}}
              />
              <button onClick={signHandler} className = {styles.signinbtn}>Sign In</button>
          </div>
          <div style={{marginTop:"1rem"}}>
            New User ? <Link to = "/register">Sign Up</Link>
        </div>
        </div>
      </div>
    );
  };

  export default SignIn
  