import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const RequireAdmin = () => {
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    var admin = false;

    if(userInfo)
        admin = userInfo.isAdmin
    return (
        admin
            ? <Outlet />
            : <Navigate to="/onlyadmins" state={{ from: location }} replace />
    );
}

export default RequireAdmin;