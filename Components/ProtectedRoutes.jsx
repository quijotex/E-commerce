import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
    
    const tokenValue = localStorage.getItem("token");

    if(tokenValue){
        return <Outlet/>
    } else {
        return <Navigate to="#/login"/>
    }


}

export default ProtectedRoutes