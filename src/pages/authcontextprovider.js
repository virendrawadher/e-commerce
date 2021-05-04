import {createContext, useContext, useState} from "react"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [ isLogin, setIsLogIn ] = useState(false);
    const [userName, setUserName] = useState("");
    return (
        <AuthContext.Provider value = {{isSignUp, setIsSignUp, isLogin, setIsLogIn, userName, setUserName}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => {
    return useContext(AuthContext)
}

