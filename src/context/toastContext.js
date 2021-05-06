import {createContext, useContext} from "react"
import {ToastContainer, toast} from "react-toastify"

const ToastContext = createContext()

export const ToastProvider = ({children}) => {
    return (
        <ToastContext.Provider value = {{ToastContainer, toast}}>
            {children}
        </ToastContext.Provider>
    )
} 

export const useToast =() => {
    return useContext(ToastContext)
}