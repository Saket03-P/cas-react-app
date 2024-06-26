import React, { useState } from "react";
import { auth } from '../../configs/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginAdmin, setUserData } from "../../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
// import { logIn } from "../../redux/slices/AuthSlice";

const AdminSignIn=()=>{
    const dispatch= useDispatch()
    const navigate= useNavigate()

    const [signInInput, setSignInInput]= useState({ username: '', password: '' })

    const handleSignIn = (evt) => {
        setSignInInput({ ...signInInput, [evt.target.name]: evt.target.value })
    }

    const submitSignIn = (evt) => {
        signInWithEmailAndPassword(auth, signInInput.username, signInInput.password)
            .then((userCredentials) => {
                // const { email, uid }= action.payload
                // state.uesr= { email, uid }
                const user= { email: userCredentials.user.email, uid: userCredentials.user.uid }

                if (user.email == 'admin@cas.com') {
                    dispatch(loginAdmin())
                }

                // localStorage.setItem('user_id', user)
                // dispatch(setUserData(user))
                console.log('Signed In Admin ', user.email)
            })
            .then(() => navigate('/admin-dashboard'))
            .catch((err) => {
                console.log(err)
            })

            setSignInInput({ username: '', password: '' })
        evt.preventDefault()
    }

    return(
        <div className="sign-in-container">
            <form onSubmit={ submitSignIn }>
                <h1>Sign In as Admin</h1>
                <input type="email" name="username" value={ signInInput.username } onChange={ handleSignIn } />
                <br />
                <input type="password" name="password" value={ signInInput.password } onChange={ handleSignIn } />
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}
 
export default AdminSignIn;