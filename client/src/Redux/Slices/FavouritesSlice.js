import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

export const toggleFavThunk = createAsyncThunk("/favorites/add", async({ blogId, blogUserId }) => {
    try{
        const res = axiosInstance.post(`favourites/fav/${blogId}`, { blogUserId });
        toast.promise(res, {
            loading : 'Wait For a moment',
            success : (data) => data?.data?.message,
            error :'Some Error occurred , please try again later'
        })

        return (await res).data;

    }catch(err){
        console.log(`Error occurred while toggling favourite using thunk : ${err}`);
    }
})

export const getAllFavThunk = createAsyncThunk("/favourites/my", async () => {
    try{
        const res = axiosInstance.get("favourites/");
        toast.promise(res, {
            loading : 'Fetching your Favourite Blogs !!',
            success : (data) => data?.data?.message,
            error : "Error occurred while fetching your favourite blogs",
        })
    
        return (await res).data;

    }catch(err){
        console.log(`Error occurred while fetching all favourites for the user : ${err}`);
    }
})


const favouriteSlice = createSlice({
    name : 'favourite',
    initialState : {},
    reducers : {},
})




export default favouriteSlice.reducer;

