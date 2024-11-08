import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

export const toggleFavThunk = createAsyncThunk("/favorites/add", async({ blogId, blogUserId }) => {
    try{
        const res = axiosInstance.post(`favourites/fav/${blogId}`,  {blogUserId} );
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

export const getFavCountThunk = createAsyncThunk("/favourites/my", async ({ blogId }) => {
    try {

        const res = axiosInstance.get(`favourites/countfav/${blogId}`);
        console.log("Full API Response: ", res);
        console.log("Response Data: ", res.data);

        toast.promise(Promise.resolve(res), {
            loading: 'Fetching the count of favourites for your blog',
            success: (response) => {
                console.log("Toast Response Data: ", response?.data?.data); 
                return `Total Stars: ${response?.data?.data?.countFavourites || 0}`;
            },
            error: `Error occurred while fetching stars for your blog`
        });

        return res.data;

    } catch (err) {
        console.log(`Error occurred while fetching count of favourites for a particular blog: ${err}`);
    }
});

export const clearAllFavThunk = createAsyncThunk("/favourites/my", async() => {
    try{
        const res = axiosInstance.delete("favourites/clear");
        toast.promise(res, {
            loading : 'Removing all favourites',
            success : (data) => data?.data?.message,
            error : "Favourites not removed"
        });

        return ( await res).data;

    }catch(err){
        console.log(`Error occurred while deleting all favourites : ${err}`);
    }
})

const favouriteSlice = createSlice({
    name : 'favourite',
    initialState : {},
    reducers : {},
})




export default favouriteSlice.reducer;

