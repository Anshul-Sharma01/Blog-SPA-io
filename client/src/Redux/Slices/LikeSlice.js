import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";


export const toggleBlogLikeThunk = createAsyncThunk("/blogs/all", async({ blogId }) => {
    try{
        const res =  axiosInstance.post(`like/toggle/b/${blogId}`, {blogId});
        toast.promise(res, {
            loading : 'Updating Blog Like...',
            success : (data) => data?.data?.message,
            error : "Error occurred while updating the blog like"
        })

        return  ( await res ).data;

    }catch(err){
        console.log(`Error occurred while toggling Blog Like : ${err}`);
    }
})

export const toggleCommentLikeThunk = createAsyncThunk("toggle/c", async ({ commentId }) => {
    try {
        const res = axiosInstance.post(`/like/toggle/c/${commentId}`, { commentId });
        toast.promise(res, {
            loading: 'Updating Comment Like...',
            success: (data) => data?.data?.message,
            error: (err) => err?.response?.data?.message || 'Error occurred while updating the comment like',
        });
        return (await res).data;
    } catch (err) {
        console.log(`Error occurred while toggling the comment Like : ${err}`);
        throw err;
    }
});



const likeSlice = createSlice({
    name : 'like',
    initialState : {},
    reducers : {}
})


export default likeSlice.reducer;


