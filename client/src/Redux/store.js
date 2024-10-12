import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import blogSliceReducer from "./Slices/BlogSlice.js";
import favouriteSliceReducer from "./Slices/FavouritesSlice.js";
import CommentSliceReducer from "./Slices/CommentSlice.js";
import LikeSliceReducer from "./Slices/LikeSlice.js";
import adminSliceReducer from "./Slices/AdminSlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        adming : adminSliceReducer,
        blog : blogSliceReducer,
        fav : favouriteSliceReducer,
        comment : CommentSliceReducer,
        like : LikeSliceReducer
    },
})

export default store;

