import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import blogSliceReducer from "./Slices/BlogSlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        blog : blogSliceReducer
    },
})

export default store;

