import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";


const initialState = {
    personalBlogsExists : localStorage.getItem('personalBlogsExists') || false,
    blogsData : [],
}

export const createNewBlog = createAsyncThunk("/blog/create", async(data) => {
    try{
        const res = axiosInstance.post("blogs/create", data);
        toast.promise(res, {
            loading : 'Creating new blog..',
            success : "Blog created successfully",
            error : "Failed to create new blog"
        })

        return (await res).data;
    }catch(err){
        console.log("Error occurred in creating new blog : ", err);
    }
})


const blogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(createNewBlog.fulfilled, (state, action) => {
            if(action?.payload?.statusCode == 201){
                state.personalBlogsExists = true;
            }
        })
    }
})

export default blogSlice.reducer;