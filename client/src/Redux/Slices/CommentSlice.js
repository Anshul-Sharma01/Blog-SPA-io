import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllCommentsThunk = createAsyncThunk("/blogs/view", async(data) => {
    try{

    }catch(err){
        console.log(`Error occurred while fetch all comments : ${err}`);
    }
})

export const addCommentThunk = createAsyncThunk("/blogs/view", async(data) => {
    try{

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



