import React from "react"
import styles from "../css/style.module.css"
import { useAuth } from "../context/authcontextprovider"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const SignOutModal = ({setUserModal}) => {

    const {setIsLogIn} = useAuth()

    const signOutHandler = () => {
        localStorage.removeItem('login')
        localStorage.removeItem('username')
        setIsLogIn(false)
    }

    return(
        <div className = {styles.modal} onClick = {() => setUserModal(false)}>
            <div className = {styles.usermodalcontainer} onClick = {(e) => e.stopPropagation}>
                <div style = {{marginTop: "0.5rem"}}>
                    <Link to = "" className = {styles.useraccount}>My Account</Link>
                </div>
                <button onClick = {signOutHandler} className = {styles.signoutbtn}>Sign Out</button>
            </div>
        </div>
    )

}

export const SignOut = () => {

    const [userModal, setUserModal] = useState(false)
    const [userletter, setUserLetter] = useState("")

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('username'))
        console.log(username)
        username?.userName && setUserLetter(username.userName.slice(0, 1).toUpperCase())
    })
    
    const signOutModalHandler = () => {
        setUserModal(!userModal)
    }

    console.log({userletter})
    return(
        <div>
            <div className = {styles.userlettercontainer} onClick = {signOutModalHandler}>
                <span className = {styles.userletter}>{userletter}</span>
            </div>
            { userModal && <SignOutModal setUserModal = {setUserModal}/>}
        </div>
    )
}