import React, { useState } from "react";
import { auth } from "../../configs/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
 
const SignUp=()=>{
    // const [email,SetEmail]=useState('');
    // const [password,SetPassword]=useState('');

    const [signUpInput, setSignUpInput]= useState({ username: '', password: '' })

    const handleSignUp = (evt) => {
        setSignUpInput({ ...signUpInput, [evt.target.name]: evt.target.value })
    }

    const submitSignUp = (evt) => {
        createUserWithEmailAndPassword(auth, signUpInput.username, signUpInput.password)
            .then((newUserCredentials) => {
                const newUser= newUserCredentials.user
                console.log('Signed Up User ', newUser)
            })
            .catch((err) => {
                console.log(err)
            })

        setSignUpInput({ username: '', password: '' })
        evt.preventDefault()
    }

    // const auth= getAuth()
    // const handleSignUp= (evt) => {
    //     evt.preventDefault()

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredentials) => {
    //             const user= userCredentials.user
    //             console.log("user registered", user)
    //             SetEmail('')
    //             SetPassword('')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // const signUp=(e)=>{
    //     e.preventDefault();
    //     createUserWithEmailAndPassword(auth,email,password)
    //     .then((response)=>{
    //         console.log(response)
    //     }).catch((error)=>{
    //         console.log(error)
    //     });
    // };
    
    return(
        <div className="sign-in-container">
            <form onSubmit={ submitSignUp }>
               
                <h1>Sign Up</h1>
                <input type="email" name="username" value={ signUpInput.username } onChange={ handleSignUp } />
                <br />
                <input type="password" name="password" value={ signUpInput.password } onChange={ handleSignUp } />
                <br />
                <button>Sign Up</button>

                {/* <input type="email" placeholder="Enter your email" value={email}
                onChange={(e)=>{SetEmail(e.target.value)}}></input>
                <input type="password" placeholder="Enter your password" value={password}
                onChange={(e)=>{SetPassword(e.target.value)}}></input>
                <button type="submit">SignUp</button> */}
            </form>
        </div>
    )
}
 
export default SignUp;