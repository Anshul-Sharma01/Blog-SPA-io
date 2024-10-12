import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";
import { ApiError } from "../../../../server/src/utils/ApiError.js";



export const fetchTotalCount = createAsyncThunk("/admin/dashboard", async () => {
    try{
        const res = axiosInstance.get("admin/get-total-count");
        toast.promise(res, {
            loading : 'Fetching count analytics...',
            success:  (data) => data?.data?.message,
            error : 'Failed to fetch the analytics !!'
        })

        return (await res).data;
        
    }catch(err){
        console.error(`Error occurred while fetching total count : ${err}`);
    }
})

export const fetchAllUsers = createAsyncThunk("/admin/dashboard", async() => {
    try{
        const res = axiosInstance.get("admin/get-all-users");
        toast.promise(res, {
            loading : 'fetching all users...',
            success : (data) => data?.data?.message,
            error : "Failed to fetch all users!!"
        })

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while fetching all users : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while fetching all users !!");
    }
})

export const deleteSelectedUser = createAsyncThunk("/admin/dashboard", async({ userId }) => {
    try{
        const res = axiosInstance.delete(`admin/user/delete/${userId}`);
        toast.promise(res, {
            loading : "Deleting the user...",
            success : (data) => data?.data?.message ,
            error : "Failed to delete the user !!"
        })
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while deleting the user : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while deleting the user !!");
    }
})



const adminSlice = createSlice({
    name : 'admin',
    initialState : {},
    reducers : {},
})


export default adminSlice.reducer