import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import blogSliceReducer from "./Slices/BlogSlice.js";
import favouriteSliceReducer from "./Slices/FavouritesSlice.js";
import CommentSliceReducer from "./Slices/CommentSlice.js";
import LikeSliceReducer from "./Slices/LikeSlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        blog : blogSliceReducer,
        fav : favouriteSliceReducer,
        comment : CommentSliceReducer,
        like : LikeSliceReducer
    },
})

export default store;

