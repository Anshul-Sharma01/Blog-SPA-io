import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


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
        const { username, name, email, password } = req.body;

        if(!username || !name || !email || !password){
            throw new ApiError(400, "All fields are mandatory");
        }

        const userNameExists = await User.findOne({username});
        if(userNameExists){
            throw new ApiError(400, "Username already exists");
        }

        const emailExists = await User.findOne({email});
        if(emailExists){
            throw new ApiError(400, "Email already exists");
        }


        if(req.file){
            const avatarLocalPath = req.file.path;
            const avatar = await uploadOnCloudinary(avatarLocalPath);

            if(!avatar){
                throw new ApiError(400, "Avatar file is not uploaded");
            }

            const user = await User.create({
                username,
                email,
                name,
                password,
                avatar : {
                    secure_url : avatar.secure_url,
                    public_id : avatar.public_id
                }
            })

            const createdUser = await User.findById(user._id).select(
                "-password -refreshToken"
            );
            if(!createdUser){
                throw new ApiError(500, "Something went wrong while registering the user");
            }

            return res.status(201).json(
                new ApiResponse(201, createdUser, "User registered Successfully")
            );

        }else{
            throw new ApiError(400, "Avatar file is required");
        }



    }catch(err){
        throw new ApiError(400, "Error occurred while registering the user");
    }
})

const login = asyncHandler(async (req, res, next) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            throw new ApiError(400, "Email or password is required");
        }

        const user = await User.findOne({ email });

        if(!user){
            throw new ApiError(404, "User does not exists");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if(!isPasswordValid){
            throw new ApiError(401, "Invalid User credentials");
        }

        const { accessToken, refreshToken } = await generateAcessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user : loggedInUser, accessToken, refreshToken
                },
                "User Logged In Successfully"
            )
        )

    }catch(err){
        throw new ApiError(400, err?.message || "Authentication failed");
    }
})

const logout = asyncHandler( async (req, res, next) => {
    try{    
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset : {
                    refreshToken : undefined
                }
            },
            {
                new : true
            }
        )

        return res.status(200)
        .clearCookie("accessToken",cookieOptions)
        .clearCookie("refreshTokn", cookieOptions)
        .json(new ApiResponse(200, {}, "User loggedOut succesfully"))
    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while logging out");
    }
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