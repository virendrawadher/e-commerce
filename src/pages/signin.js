import axios from "axios"
import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom"
import { useAuth } from "./authcontextprovider";

const SignIn = (props) => {

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const {setIsLogIn, userName, setUserName} = useAuth()
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
        navigate("/");
        localStorage.setItem("login", JSON.stringify({isUserLogin: true}))
        localStorage.setItem('username', JSON.stringify({userName: userName}))
      } else if (response.data.success === false) {
        setIsLogIn(false);
        setMessage(response.data.message)
        setPassword("");
      }
    }
    console.log(userName)
    return (
      <div>
        <h2>Sign in</h2>
        <label>
          Enter the email{" "}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Enter the password{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button onClick={signHandler}>Sign In</button>
        <div>{message}</div>
      </div>
    );
  };

  export default SignIn
  