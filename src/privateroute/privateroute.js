import {Route} from "react-router-dom";


const PrivateRoute = ({path, isLogin, ...props}) => {

    return (
        isLogin && <Route path = {path} {...props}/> 
    )
}

export default PrivateRoute