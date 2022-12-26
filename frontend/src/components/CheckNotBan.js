import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import checkBanned from "../components/checkForBan";
import checkNotification from "../components/checkNotification";
import { logout } from "../actions/userActions";

function CheckNotBan (){
    const dispatch = useDispatch();
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if(userInfo)
    { 
        console.log("notban")
        const { userInfo } = userLogin;
        checkBanned(userInfo);
        if(!localStorage.getItem("notification"))
        checkNotification(userInfo);
        const getBanned = localStorage.getItem("isBanned")
        if(getBanned)
        {
            console.log("getbanned")
            localStorage.clear()
            console.log(localStorage)
            dispatch(logout());
            return <Navigate to="/banned" state={{ from: location }} replace />
        }
        else{
            return <Outlet/>
        }
    }
    else
        {
            console.log("no user")
            return <Outlet/>
        }
}

export default CheckNotBan;