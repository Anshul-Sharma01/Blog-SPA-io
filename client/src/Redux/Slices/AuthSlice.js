import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";
import Cookies from "js-cookie";  // Import js-cookie

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    userRole: localStorage.getItem('role') || "",
    userData: JSON.parse(localStorage.getItem('data')) || {}
}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("users/register", data);

        toast.promise(res, {
            loading: 'Creating your account..',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create an account'
        })

        return (await res).data;
    } catch (error) {
        console.error("Error occurred in creating new account: ", error);
    }
})

export const LoginUser = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("users/login", data);
        toast.promise(res, {
            loading: "Wait for a moment!!",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to authenticate your credentials"
        })

        return (await res).data;

    } catch (err) {
        console.error("Error occurred while authenticating credentials: ", err);
    }
})

export const Logout = createAsyncThunk("/auth/logout", async (req, res) => {
    try {
        const res = axiosInstance.post("users/logout", {}, { withCredentials: true });
        toast.promise(res, {
            loading: "Wait! Logout in progress",
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to Log Out'
        })

        // Clear cookies here
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        return (await res).data;
    } catch (err) {
        console.log("Logout Error : ", err);
        toast.error(err?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem('userData', JSON.stringify(action?.payload?.data?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.userData = action?.payload?.data?.user;
            state.userRole = action?.payload?.data?.user?.role;
        })
            .addCase(createAccount.rejected, (state) => {
                localStorage.clear();
                state.userData = {};
                state.isLoggedIn = false;
                state.userRole = " ";
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                localStorage.setItem('userData', JSON.stringify(action?.payload?.data?.user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.data?.user?.role);
                state.isLoggedIn = true;
                state.userData = action?.payload?.data?.user;
                state.userRole = action?.payload?.data?.user?.role;
            })
            .addCase(LoginUser.rejected, (state) => {
                localStorage.clear();
                state.userData = {};
                state.isLoggedIn = false;
                state.userRole = " ";
            })
            .addCase(Logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.userData = {};
                state.userRole = "";
            })
    }
})

export default authSlice.reducer;
