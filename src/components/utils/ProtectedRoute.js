// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute= ({ children }) => {
//     const user= useSelector((state) => state.authRed.userData)
//     console.log(user, 'in protectedroute')
//     let locn= useLocation()

//     if (user.username == '') {
//         return <Navigate to='/signin' state={{ from: locn }} replace />
//     }

//     return children
// }

// export default ProtectedRoute

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute= ({ children }) => {
    const loginStatus= useSelector((state) => state.authRed.isLoggedIn)
    // console.log(user, 'in protectedroute')
    console.log(loginStatus, ' now in protectedRoute')
    let locn= useLocation()

    if (!loginStatus) {
        console.log('go to login')
        return <Navigate to='/signin' state={{ from: locn }} replace />
    }

    console.log('you can go to your child')
    return children
}

export default ProtectedRoute
