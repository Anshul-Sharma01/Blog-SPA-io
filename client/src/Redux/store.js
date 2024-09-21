import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import blogSliceReducer from "./Slices/BlogSlice.js";
import favouriteSliceReducer from "./Slices/FavouritesSlice.js";


const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        blog : blogSliceReducer,
        fav : favouriteSliceReducer
    },
})

export default store;

