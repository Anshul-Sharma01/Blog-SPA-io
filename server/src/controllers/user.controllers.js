import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs/promises";
import asyncHandler from "../utils/asyncHandler.js";


const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    secure : true,
    httpOnly : true
}

const generateAcessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save( { validateBeforeSave : false } );
        return { accessToken, refreshToken,  }
    }catch(err){
        throw new ApiError(500, "Something went wrong while generating Access and Refresh Tokens");
    }
}


const register = asyncHandler(async (req, res, next) => {   

})

const login = asyncHandler(async (req, res, next) => {

})

const logout = asyncHandler( async (req, res, next) => {

})

const getProfile = asyncHandler( async (req, res, next) => {

})

const forgotPassword = asyncHandler( async (req, res, next ) => {

})

const resetPassword = asyncHandler( async (req, res, next) => {

})

const changePassword = asyncHandler( async (req, res, next ) => {

})

const getAllUsers = asyncHandler(async (req, res, next) => {

})

const updateUser = asyncHandler( async (req, res, next) => {

})

const deleteUser = asyncHandler( async (req, res, next) => {

})

const addNewUser = asyncHandler(async (req, res, next) => {

})

const refreshAccessToken = asyncHandler( async (req, res, next) => {

})



export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    getAllUsers,
    updateUser,
    deleteUser,
    addNewUser,
    refreshAccessToken
}