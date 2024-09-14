import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";
import Cookies from "js-cookie";  // Import js-cookie
import axios from "axios";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', 
    userRole: localStorage.getItem('role') !== undefined ? localStorage.getItem('role') : "", 
    userData: JSON.parse(localStorage.getItem('userData')) !== undefined ? JSON.parse(localStorage.getItem('userData')) : {},  
    personalBlogsExists: localStorage.getItem('personalBlogsExists') === 'true', 
};


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
            error:"Failed to authenticate your credentials"
        })

        return (await res).data;

    } catch (error) {
        console.error("Error occurred while authenticating credentials: ", error);
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

export const resetUserPassword = createAsyncThunk("/auth/reset", async(data) => {
    try{
        console.log(data);
        const res = axiosInstance.post("users/reset", data);
        toast.promise(res, {
            loading : 'Wait for a moment !',
            success : `Email successfully sent to ${data.email}`,
            error : 'Error occurred while sending mail'
        });

        return (await res).data;

    }catch(err){
        console.log("Error occurred while sending reset token through mail : ", err);
    }
})

export const resetPasswordToken = createAsyncThunk("/auth/reset/:resetToken", async ({ resetToken, password }) => {
    try {
        const res = axiosInstance.post(`users/reset/${resetToken}`, { password });
        toast.promise(res, {
            loading: "Resetting your password",
            success: "Password reset successfully",
            error: "Error occurred while resetting your password",
        });

        return (await res).data;
    } catch (err) {
        console.log("Error occurred while updating the password using reset token: ", err);
        
    }
});

export const changePasswordThunk = createAsyncThunk("/auth/password/change", async({ oldPassword, newPassword }) => {
    try{
        const res = axiosInstance.post("users/change-password", { oldPassword, newPassword });
        toast.promise(res, {
            loading : "Changing your password",
            success : "Password changed successfully",
            error : "Error occurred while changing the password"
        })
        return (await res).data;
    }catch(err){
        console.log("Error occurred while changing password using old password : ", err);
    }
})

export const updateUserThunk = createAsyncThunk("/me/profile/update", async (data) => {
    try{
        const res = axiosInstance.patch("users/update-profile", data);
        toast.promise(res, {
            loading : "Updating Your details",
            success : "Details updated successfully",
            error : "Error occurred while updating the details"
        })
        return (await res).data;
    }catch(err){
        console.log("Error occurred while updating user details : ", err);
    }
})

export const updateUserAvatarThunk = createAsyncThunk("/me/profile/avatar", async(data) => {
    try{
        const res = axiosInstance.patch("users/update-avatar", data,{ headers: {
            'Content-Type': 'multipart/form-data',
        }});
        toast.promise(res, {
            loading : 'Updating your profile picture',
            success : "Profile photo updated successfully",
            error : "Error occurred while updating profile picture"
        })

        return (await res).data;
    }catch(err){
        console.log(`Error occurred while updating user avatar  : ${err}`);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 201) {
                const user = action?.payload?.data?.user;
                localStorage.setItem('userData', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', user?.role);

                state.isLoggedIn = true;
                state.userData = user;
                state.userRole = user?.role;
                state.personalBlogsExists = user?.blogCount > 0;  // Update based on blog count
                localStorage.setItem('personalBlogsExists', state.personalBlogsExists);
            }
        })
            .addCase(createAccount.rejected, (state) => {
                localStorage.clear();
                state.userData = {};
                state.isLoggedIn = false;
                state.userRole = " ";
                state.personalBlogsExists = false;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                if (action?.payload?.statusCode === 200) {
                    const user = action?.payload?.data?.user;
                    localStorage.setItem('userData', JSON.stringify(user));
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('role', user?.role);

                    state.isLoggedIn = true;
                    state.userData = user;
                    state.userRole = user?.role;
                    state.personalBlogsExists = user?.blogCount > 0;  
                    localStorage.setItem('personalBlogsExists', state.personalBlogsExists);
                }
            })
            .addCase(LoginUser.rejected, (state) => {
                localStorage.clear();
                state.userData = {};
                state.isLoggedIn = false;
                state.userRole = " ";
                state.personalBlogsExists = false;
            })
            .addCase(Logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.userData = {};
                state.userRole = "";
                state.personalBlogsExists = false;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                if(action?.payload?.statusCode == 200){
                    console.log("Update User Payload:", action.payload);
                    localStorage.setItem('userData', JSON.stringify(action?.payload?.data));
                    state.userData = action?.payload?.data;
                }
            })
            .addCase(updateUserAvatarThunk.fulfilled, (state, action) => {
                if(action?.payload?.statusCode == 200){
                    // console.log("Actions-Payload : ",action?.payload);
                    localStorage.setItem('userData', JSON.stringify(action?.payload?.data));
                    state.userData = action?.payload?.data;
                }
            })
    }
})

export default authSlice.reducer;
