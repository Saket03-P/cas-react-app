import React, { useState } from "react";
import { auth } from "../../configs/firebase";
import { db } from "../../configs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
 
const SignUp=()=>{
    const [signUpInput, setSignUpInput]= useState({ 
        email: '', 
        password: '',
        displayName: '',
        dob: '', 
        address: ''
    })

    const navigate= useNavigate()

    const handleSignUp = (evt) => {
        evt.preventDefault();

        createUserWithEmailAndPassword(auth, signUpInput.email, signUpInput.password)
            .then((newUserCredentials) => {
                const newUser = newUserCredentials.user;

                // Store additional user details in Firestore
                const userDetails = {
                    displayName: signUpInput.displayName,
                    dob: signUpInput.dob,
                    address: signUpInput.address,
                    // Add more fields as needed
                };

                // Set additional user details in Firestore
                db.collection('users').doc(newUser.uid).set(userDetails)
                    .then(() => {
                        console.log('User details stored successfully in Firestore');
                    })
                    .catch((error) => {
                        console.error('Error storing user details:', error);
                    });

                console.log('Signed Up User ', newUser);
                navigate('/signin')
            })
            .catch((err) => {
                console.error('Error signing up user:', err);
            });

        // Clear sign-up input fields after submission
        setSignUpInput({
            email: '',
            password: '',
            displayName: '',
            dob: '',
            address: ''
        });
    }

    // const handleSignUp = (evt) => {
    //     setSignUpInput({ ...signUpInput, [evt.target.name]: evt.target.value })
    // }

    // const submitSignUp = (evt) => {
    //     createUserWithEmailAndPassword(auth, signUpInput.username, signUpInput.password)
    //         .then((newUserCredentials) => {
    //             const newUser= newUserCredentials.user
    //             console.log('Signed Up User ', newUser)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    //     setSignUpInput({ username: '', password: '' })
    //     evt.preventDefault()
    // }
    
    return(
        <div className="sign-in-container">
            <form onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                <input type="text" name="displayName" placeholder="Display Name" value={signUpInput.displayName} onChange={(e) => setSignUpInput({ ...signUpInput, displayName: e.target.value })} required />
                <br />
                <input type="email" name="email" placeholder="Email" value={signUpInput.email} onChange={(e) => setSignUpInput({ ...signUpInput, email: e.target.value })} required />
                <br />
                <input type="password" name="password" placeholder="Password" value={signUpInput.password} onChange={(e) => setSignUpInput({ ...signUpInput, password: e.target.value })} required />
                <br />
                <input type="date" name="dob" placeholder="Date of Birth" value={signUpInput.dob} onChange={(e) => setSignUpInput({ ...signUpInput, dob: e.target.value })} required />
                <br />
                <textarea name="address" placeholder="Address" value={signUpInput.address} onChange={(e) => setSignUpInput({ ...signUpInput, address: e.target.value })} required />
                <br />
                <button type="submit">Sign Up</button>
            </form>

            {/* <form onSubmit={ submitSignUp }>
                <h1>Sign Up</h1>
                <input type="email" name="username" value={ signUpInput.username } onChange={ handleSignUp } />
                <br />
                <input type="password" name="password" value={ signUpInput.password } onChange={ handleSignUp } />
                <br />
                <button>Sign Up</button>
            </form> */}
        </div>
    )
}
 
export default SignUp;