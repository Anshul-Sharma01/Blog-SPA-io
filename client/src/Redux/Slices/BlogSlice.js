import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";
import DOMPurify from 'dompurify';


const initialState = {
    personalBlogsExists: localStorage.getItem('personalBlogsExists') === 'true',
    blogsData: [],
    allBlogsData: [],
};


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
            success: (data) => data?.data?.message,
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
            success : (data) => data?.data?.message,
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

export const fetchLatestBlogs = createAsyncThunk("/view/author-profile/:authorId", async ({ authorId }) => {
    try{
        const res = axiosInstance.get(`blogs/view/author-blogs/${authorId}`);
        toast.promise(res,{
            loading : 'Working on author blogs....',
            success : (data) => data?.data?.message,
            error : "Failed to fetch author blogs at a moment..."
        })

        return (await res).data;
    }catch(err){
        console.log(`Error occurred in fetching latest blogs for a author : ${err}`);
    }
})

export const fetchSearchBlogs = createAsyncThunk("/blogs/all", async({ query, page, limit }) => {
    try{
        const res = axiosInstance.get(`blogs/view/search?page=${page}&limit=${limit}&query=${query}` );
        toast.promise(res, {
            loading : "Searching blogs...",
            success : ( data ) => data?.data?.message,
            error:"Failed to search blogs !!"
        })
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while fetching searched blogs : ${err}`);
    }
})

export const updateBlogThunk = createAsyncThunk("/blogs/update/:blogId", async({ title, content, blogId, category }) => {
    try{
        const res = axiosInstance.patch(`/blogs/update/${blogId}`, { title, content, category });
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

export const updateBlogThumbnailThunk = createAsyncThunk("/blogs/update/thumbnail", async ({ blogId, formData }) => {
    try {
        const res = axiosInstance.patch(`blogs/thumbnail/update/${blogId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        toast.promise(res, {
            loading: 'Updating Blog Thumbnail',
            success: "Successfully Updated Blog Thumbnail",
            error: "Error occurred while updating Blog Thumbnail"
        });

        return (await res).data;

    } catch (err) {
        console.log(`Error occurred while updating blog thumbnail using thunk : ${err}`);
    }
});

export const deleteBlogThunk = createAsyncThunk("/blogs/delete/:blogId", async({ blogId }) => {
    try{
        const res = axiosInstance.get(`blogs/delete/${blogId}`);
        toast.promise(res, {
            loading : 'Deleting the blog',
            success : "Blog deleted successfully",
            error : "Error occurred in deleting the blog"
        })

        return ( await res).data;

    }catch(err){
        console.log("Error occurred while deleting the blog using thunk : ", err);
    }
})

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(createNewBlog.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 201) {
                state.personalBlogsExists = true; 
                localStorage.setItem('personalBlogsExists', 'true');
                localStorage.setItem('userData', JSON.stringify(action?.payload?.data?.user));
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
        .addCase(deleteBlogThunk.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 200) {
                const user = action?.payload?.data?.user;
                localStorage.setItem('userData', JSON.stringify(user));
                
                if (user?.blogCount === 0) {
                    state.personalBlogsExists = false;  
                    localStorage.setItem('personalBlogsExists', 'false');
                }
            }
        });
    }
})

export default blogSlice.reducer;
