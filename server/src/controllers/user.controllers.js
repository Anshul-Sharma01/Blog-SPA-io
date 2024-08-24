import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { decode } from "punycode";
import { access } from "fs";


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
    try{
        
    }catch(err){
        throw new ApiError(400, "Error occurred while registering the user");
    }
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
    const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingrefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    try{
        const decodedToken = jwt.verify(incomingrefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new ApiError(401, "Invalid refresh Token"); 
        }

        if(incomingrefreshToken != user.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used");
        }

        const { accessToken, newRefreshToken } = await generateAcessAndRefreshTokens(user._id);

        return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", newRefreshToken)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken : newRefreshToken
                },
                "Access Token Refreshed"
            )
        )

    }catch(err){
        throw new ApiError(401, err?.message || "Invalid refresh Token");
    }
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