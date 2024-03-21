import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './slices/AuthSlice';

const store= configureStore({
    reducer: {
        authRed: AuthReducer
    }
})

export default store;