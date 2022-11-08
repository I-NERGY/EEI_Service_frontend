// In App.js, wrap components that require Authentication with this component
import React from "react";
import {useEffect, useState} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

const RequireAuth = () => {
    const {user} = useAuthContext()
    const [allowed, setAllowed] = useState<boolean | null>(null)
    const location = useLocation()

    useEffect(() => {
        if (user) {
            user && setAllowed(true)
        } else {
            setAllowed(false)
        }
    }, [user]);

    return (
        <>
            {allowed === true && <Outlet/>}
            {!user && allowed === false && <Navigate to={'/signin'} state={{from: location}} replace/>}
        </>
    )
}

export default RequireAuth