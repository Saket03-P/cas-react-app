import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute= ({ children }) => {
    const user= useSelector((state) => state.authRed.userData)
    console.log(user, 'in protectedroute')
    let locn= useLocation()

    if (user.username == null) {
        return <Navigate to='/signin' state={{ from: locn }} replace />
    }

    return children
}

export default ProtectedRoute

// import React, { Component } from "react";
// import { Redirect, Route, redirect } from 'react-router-dom';
// import { useSelector } from "react-redux";

// const ProtectedRoute= ({component: Component}) => {
//     const user= useSelector(state => state.auth.value)
//     console.log('User', user)

//     return (
//         <Route 
//             render={(props) => {
//                 if (user) {
//                     return <Component { ...props } />
//                 } else {
//                     // return <Redirect to='/' />
//                     return redirect('/')
//                 }
//             }}
//         />
//     )
// }

// export default ProtectedRoute;