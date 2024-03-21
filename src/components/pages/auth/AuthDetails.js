import { onAuthStateChanged,signOut} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../configs/firebase";
 
const AuthDetails=()=>{
    const [authuser,SetAuthUser]=useState('');
 
    useEffect(()=>{
        const listen =onAuthStateChanged(auth,(user)=>{
            if(user){
                SetAuthUser(user);
            }
            else{
                SetAuthUser(null);
            }
        })
 
        return ()=>{
            listen();
        }
    },[])
    const userSignOut=()=>{
        signOut(auth)
        .then(()=>{
            console.log('signed out successfully')
 
        }).catch(error=>console.log(error))
    }
    return(
        <div>
            {authuser?
                <>
                <p>{`Signed In ${authuser.email}`}</p>
                <button onClick={userSignOut}>SignOut</button>
                </>
           
            :<p>Signed Out</p>}
        </div>
    )
}
export default AuthDetails;