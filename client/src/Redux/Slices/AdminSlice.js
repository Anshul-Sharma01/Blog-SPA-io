import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";


export const fetchTotalCount = createAsyncThunk("/admin/dashboard", async (data) => {
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




const adminSlice = createSlice({
    name : 'admin',
    initialState : {},
    reducers : {},
})


export default adminSlice.reducer