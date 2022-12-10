import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import checkBanned from "../components/checkForBan";
import { logout } from "../actions/userActions";

function RequireAuth (){
    console.log("This is require auth")
    const dispatch = useDispatch();
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if(userInfo)
    { 
        const { userInfo } = userLogin;
        console.log("Now im checking if hes banned")
        checkBanned(userInfo);
        console.log("this is is banned: ")
        const getBanned = localStorage.getItem("isBanned")
        console.log(getBanned)
        console.log("This is the user info: ")
         console.log(userInfo)
    
        if(getBanned)
        {
            console.log("getbanned exists")
            localStorage.clear()
            console.log(localStorage)
            dispatch(logout());
            return <Navigate to="/banned" state={{ from: location }} replace />
        }
        else if (userInfo)
        {
            console.log("no ban but user exists")
            return <Outlet/>
        } 
    }
    else
        {
            console.log("No token who tf is this")
            return <Navigate to="/unauthorized" state={{ from: location }} replace /> 
        }
}

export default RequireAuth;