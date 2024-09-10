import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../Helpers/axiosInstance.js";

const initialState = {
    isLoggedIn : false,
    userRole : " ",
    userData : {}
}


export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try {
        const res = await axiosInstance.post("users/register", data);
    
        toast.promise(res, {
            loading : 'Creating your account..',
            success : (data) => {
                return data;
            },
            error : 'Failed to create an account'
        })
    
        return ( await res).data;
    } catch (error) {
        console.error("Error occurred in creating new account : ", error);
    }
})


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers,
    extraReducers : (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userData = action?.payload?.user;
            state.userRole = action?.payload?.user?.role;
        })
        .addCase(createAccount.rejected, (state) => {
            state.userData = {};
            state.isLoggedIn = false;
            state.userRole = " ";
        })
    }
})

export default authSlice.reducer;

