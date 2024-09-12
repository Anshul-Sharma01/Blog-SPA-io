import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
    personalBlogsExists: localStorage.getItem('personalBlogsExists') === 'true', // Ensure this is a boolean
    blogsData: [],
}

export const createNewBlog = createAsyncThunk("/blog/create", async(data) => {
    try {
        const res = axiosInstance.post("blogs/create", data);
        toast.promise(res, {
            loading: 'Creating new blog...',
            success: "Blog created successfully",
            error: "Failed to create new blog"
        });

        return (await res).data;
    } catch (err) {
        console.error("Error occurred in creating new blog: ", err);
    }
})

export const fetchPersonalBlogs = createAsyncThunk("/blogs/me", async() => {
    try {
        const res = axiosInstance.get("blogs/my");
        toast.promise(res, {
            loading: "Fetching Personal Blogs",
            success: "Personal blogs fetched successfully",
            error: "Failed to fetch Personal Blogs"
        });

        return (await res).data;
    } catch (err) {
        console.error("Error occurred in fetching personal blogs: ", err);
    }
})

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewBlog.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 201) {
                state.personalBlogsExists = true;
                localStorage.setItem('personalBlogsExists', 'true'); // Store as string
            }
        })
        .addCase(fetchPersonalBlogs.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 200) {
                state.blogsData = action?.payload?.data || [];
            }
        })
    }
})

export default blogSlice.reducer;
