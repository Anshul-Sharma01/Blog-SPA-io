import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
    personalBlogsExists: localStorage.getItem('personalBlogsExists') === 'true',
    blogsData: [],
    allBlogsData : [],
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

export const fetchPersonalBlogs = createAsyncThunk("/blogs/me", async(data) => {
    try {
        const res = axiosInstance.get(`blogs/my?limit=${data.limit}&page=${data.page}`);
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

export const fetchAllBlogsThunk = createAsyncThunk("/blogs/all", async(data) => {
    try{    
        const res = axiosInstance.get(`blogs/viewall?limit=${data.limit}&page=${data.page}`);
        toast.promise(res, {
            loading : 'Fetching All blogs',
            success : "Successfully Fetched All Blogs",
            error : "Error occurred while fetching all blogs"
        })

        return (await res).data;
        
    }catch(err){
        console.log("Error occurred while fetching all blogs using thunk : ", err);
    }
})

export const fetchBlogThunk = createAsyncThunk("/blog/view/:blogId", async(data) => {
    try{
        const res = axiosInstance.get(`blogs/view/${data.blogId}`);
        toast.promise(res, {
            loading : 'Fetching Blog Details',
            success : " Blog details fetched successfully",
            error : "Error occurred in fetching Blog details"
        })

        return (await res).data;

    }catch(err){
        console.log("Error occurred while fetching a blog using thunk : ", err);
    }
})


export const updateBlogThunk = createAsyncThunk("/blogs/update/:blogId", async({ title, content, blogId }) => {
    try{
        const res = axiosInstance.patch(`/blogs/update/${blogId}`, { title, content });
        toast.promise(res, {
            loading : 'Updating blod data',
            success : "Blog details updated successfully",
            error : "Error occurred while updating blog details"
        })

        return (await res).data;
    }catch(err){
        console.log("Error occurred while updating blog data : ", err);
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
                localStorage.setItem('personalBlogsExists', 'true'); 
            }
        })
        .addCase(fetchPersonalBlogs.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 200) {
                state.blogsData = action?.payload?.data || [];
            }
        })
        .addCase(fetchAllBlogsThunk.fulfilled, (state, action) => {
            if(action?.payload?.statusCode === 200){
                state.blogsData = action?.payload?.data || { };
            }
        })
    }
})

export default blogSlice.reducer;
