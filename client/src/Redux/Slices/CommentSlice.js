import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


export const fetchAllCommentsThunk = createAsyncThunk("/blogs/view", async({ blogId }) => {
    try{
        const res = axiosInstance.get(`comments/${blogId}`);
        toast.promise(res, {
            loading : 'Fetching Blogs comments',
            success : (data) => data?.data?.message,
            error : "Error occurred while fetching blog comments"
        })
        
        return (await res).data;

    }catch(err){
        console.log(`Error occurred while fetch all comments : ${err}`);
    }
})

export const addCommentThunk = createAsyncThunk("/blogs/view", async({ blogId, content }) => {
    try{
        const res = axiosInstance.post(`comments/${blogId}`, {content});
        toast.promise(res, {
            loading : 'Adding your comment..',
            success : (data) => data?.data?.message,
            error : "Error occurred while adding a new comment"
        });

        return (await res).data;

    }catch(err){
        console.log(`Error occurred while adding a new comment : ${err}`);
    }
})


export const updateCommentThunk = createAsyncThunk("/blogs/view", async(data) => {
    try{
        
    }catch(err){
        console.log(`Error occurred while updating a comment : ${err}`);
    }
})

export const deleteCommentThunk = createAsyncThunk("/blogs/view", async(data) => {
    try{

    }catch(err){
        console.log(`Error occurred while deleting a comment : ${err}`);
    }
})






const commentsSlice = createSlice({
    name : 'Comments',
    initialState : {},
    reducers : {}
})



export default commentsSlice.reducer;



