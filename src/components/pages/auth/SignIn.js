import React, { useState } from "react";
import { auth } from '../../configs/firebase';
// import { auth } from "../configs/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUserData } from "../../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux"; 


const SignIn=()=>{
    // const [email,SetEmail]=useState('');
    // const [password,SetPassword]=useState('');

    // const auth= getAuth()

    const dispath= useDispatch()
    const loginData= useSelector(store => store.authRed.userData)

    const [signInInput, setSignInInput]= useState({ username: '', password: '' })

    const handleSignIn = (evt) => {
        setSignInInput({ ...signInInput, [evt.target.name]: evt.target.value })
    }

    const submitSignIn = (evt) => {
        signInWithEmailAndPassword(auth, signInInput.username, signInInput.password)
            .then((userCredentials) => {
                const user= userCredentials.user
                console.log('Signed In User ', user)
            })
            .catch((err) => {
                console.log(err)
            })

            setSignInInput({ username: '', password: '' })
        evt.preventDefault()
    }

    // const handleSignIn= (evt) => {
    //     evt.preventDefault()

    //     signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredentials) => {
    //         const user= userCredentials.user
    //         console.log('Signed in User', user)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
 
    // const signIn=(e)=>{
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth,email,password)
    //     .then((response)=>{
    //         console.log(response)
    //     }).catch((error)=>{
    //         console.log(error)
    //     });
    // };

    return(
        <div className="sign-in-container">
            <form onSubmit={ submitSignIn }>
                <h1>Sign In</h1>
                <input type="email" name="username" value={ signInInput.username } onChange={ handleSignIn } />
                <br />
                <input type="password" name="password" value={ signInInput.password } onChange={ handleSignIn } />
                <br />
                <button type="submit">Sign In</button>

{/* 
                <input type="email" placeholder="Enter your email" value={email}
                onChange={(e)=>{SetEmail(e.target.value)}}></input>
                <input type="password" placeholder="Enter your password" value={password}
                onChange={(e)=>{SetPassword(e.target.value)}}></input>
                <button type="submit">Login</button> */}
            </form>
        </div>
    )
}
 
export default SignIn;