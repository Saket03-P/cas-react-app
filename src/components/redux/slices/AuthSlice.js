import { createSlice } from "@reduxjs/toolkit";

// const initialState= {}

export const AuthSlice= createSlice({
    name: 'user', 
    initialState: {
        // userData: {
        //     username: '', 
        //     password: ''
        // }
        isLoggedIn: false, 
        user: null, 
        role: ''
    }, 
    reducers: {
        // setUserData: (state, action) => {
        //     console.log(__filename, state, action)
        //     state.userData= action.payload
        //     console.log(__filename, 'state executed', state.payload)
        // }
        setUserData: (state, action) => {
            console.log('reducers.setUserData()')
            // const { email, uid }= action.payload
            // state.user= { email, uid }
            state.user= action.payload
            state.role= 'user'
            state.isLoggedIn= true
            // console.log(localStorage.getItem('user_id'))
        }, 
        clearUserData: (state, action) => {
            // console.log(localStorage.getItem('user_id'))
            // localStorage.removeItem('user_id')
            console.log('reducers.clearUserData()')
            state.user= null
            state.role= ''
            state.isLoggedIn= false
            // console.log(localStorage.getItem('user_id'))
        }
    }
})

export const { clearUserData, setUserData }= AuthSlice.actions
export default AuthSlice.reducer