import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import checkBanned from "../components/checkForBan";
import CheckNotification from "../components/checkNotification";
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
        checkBanned(userInfo);
        CheckNotification(userInfo);
        const getBanned = localStorage.getItem("isBanned")
        if(getBanned)
        {
            localStorage.clear()
            console.log(localStorage)
            dispatch(logout());
            return <Navigate to="/banned" state={{ from: location }} replace />
        }
        else if (userInfo)
        {
            return <Outlet/>
        } 
    }
    else
        {
            return <Navigate to="/unauthorized" state={{ from: location }} replace /> 
        }
}

export default RequireAuth;