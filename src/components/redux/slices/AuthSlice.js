import { createSlice } from "@reduxjs/toolkit";

// const initialState= {}

export const AuthSlice= createSlice({
    name: 'user', 
    initialState: {
        userData: {
            username: '', 
            password: ''
        }
    }, 
    reducers: {
        setUserData: (state, action) => {
            console.log(state, action)
            state.userData= action.payload
            console.log(state)
        }
    }
})

export const { setUserData }= AuthSlice.actions
export default AuthSlice.reducer