import {configureStore} from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import categorySlice from "./categorySlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer :{
        api : apiSlice.reducer,
        category : categorySlice.reducer,
        auth : authSlice.reducer
    }
})

export default store;