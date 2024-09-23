import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import blogSliceReducer from "./Slices/BlogSlice.js";
import favouriteSliceReducer from "./Slices/FavouritesSlice.js";
import CommentSliceReducer from "./Slices/CommentSlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        blog : blogSliceReducer,
        fav : favouriteSliceReducer,
        comment : CommentSliceReducer
    },
})

export default store;

