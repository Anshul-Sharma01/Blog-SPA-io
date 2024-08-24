import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
import { upload } from "../middlewares/multer.middleware.js";


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
    try{
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password -refreshToken");

        res.status(200).json(new ApiResponse(200, user, "User fetched Successfully"));
    }catch(err){
        throw new ApiError(400,err?.message || "Error occurred while fetching user profile");
    }
})

const forgotPassword = asyncHandler( async (req, res, next ) => {
    const { email } = req.body;

    if(!email){
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new ApiError(400, "Email not registered");
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

    const subject = "Reset Password Link";
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank" > Reset Your Password </a>.\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\nIf you have not requested this, kindly Ignore.\n The Link will be valid for 15 minutes only`;

    try{
        await sendEmail(email, subject, message);
        return res.status(200).json(
            new ApiResponse(200, {}, `Reset Password token has been sent to ${email} successfully`)
        );
    }catch(err){
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();

        throw new ApiError(400, err?.message || "Error occurred while sending Reset Token");
    }

})

const resetPassword = asyncHandler( async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry : {$gt : Date.now()}
    });

    if(!user){
        throw new ApiError(400, "Token is invalid or expired, please try again");
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200,{ }, "Password changed successfully")
    );

})

const changePassword = asyncHandler( async (req, res, next ) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if(!oldPassword || !newPassword) {
        throw new ApiError(400, "All fields are mandatory");
    }

    const user = await User.findById(id).select('+password');
    if(!user){
        throw new ApiError(400, "User does not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordValid){
        throw new ApiError(400, "Invalid old Password");
    }

    user.password = newPassword;
    await user.save();

    user.password = undefined;
    return res.status(200).json(
        new ApiResponse(200, user, "Password changed successfully")
    );

})

const getAllUsers = asyncHandler(async (req, res, next) => {
    try{
        const allUsers = await User.find({});
        if(allUsers.length === 0){
            throw new ApiError(400, "No Users Exists");
        }
        return res.status(200).json(
            new ApiResponse(200, allUsers, "All Users fetched Successfully")
        );
    }catch(err){
        throw new ApiError(400,err?.message || "Error occurred while fetching all the users");
    }
})

const updateUser = asyncHandler( async (req, res, next) => {
    const {  name } = req.body;
    const id = req.user._id;

    try{

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name },
            {new : true, runValidators : true, context : 'query'}
        ).select('-password -refreshToken');

        if(!updatedUser){
            throw new ApiError(400, "User does not exists");
        }
        
        return res.status(200).json(
            new ApiResponse(200, updatedUser, "User detail updated successfully")
        );

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while updating user details");
    }

})

const updateUserAvatar = asyncHandler( async (req, res, next) => {
    const avatarLocalPath = req.file?.path;

    try{
        if(!avatarLocalPath){
            throw new ApiError(400, "Avatar file is required");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if(!avatar.url){
            throw new ApiError(400, "Error while updating on avatar");
        }

        const user = User.findByIdAndUpdate(
            req.user?._id,
            {
                $set : {
                    avatar : {
                        secure_url : avatar.secure_url,
                        public_id : avatar.public_id
                    }
                }
            },
            {new : true}
        ).select("-password");

        return res.status(200).json(
            new ApiResponse(200, user, "Avatar Image Updated successfully")
        );

    }catch(err){
        throw new ApiError(400, "Error occurred while updated Avatar");
    }
})

const deleteUser = asyncHandler( async (req, res, next) => {
    try{
        const { userId } = req.params;

        if(!isValidObjectId(userId)){
            throw new ApiError(400,"Invalid user-id");
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            throw new ApiError(400,"User does not exists");
        }
        return res.status(200).json(
            new ApiResponse(200,deletedUser, "User deleted Successfully")
        );

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while deleting the user");
    }
})

const addNewUser = asyncHandler(async (req, res, next) => {
    try{
        const { username, email, password, name } = req.body;
        if(!username || !name || !email || !password){
            throw new ApiError(400, "All fields are mandatory");
        }

        const userNameExists = await User.findOne({username});
        if(!userNameExists){
            throw new ApiError(400, "Username already exists");
        }
        
        const emailExists = await User.findOne({email});
        if(!emailExists){
            throw new ApiError(400,"Email already exists");
        }

        if(req.file){
            const avatarLocalPath = req.file.path;
            const avatar = await uploadOnCloudinary(avatarLocalPath);

            if(!avatar){
                throw new ApiError(400, "Avatar file is required");
            }

            const user = await User.create({
                username, email, name, password,
                avatar : {
                    secure_url : avatar.secure_url,
                    public_id : avatar.public_id
                }
            });
            if(!user){
                throw new ApiError(400,"Something went wrong while creating new user");
            }

            return res.status(201).json(
                new ApiResponse(201, user, "User created successfully")
            );
        }

    }catch(err){
        throw new ApiError(400,"Error occurred while creating a new user");
    }
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
    updateUserAvatar,
    deleteUser,
    addNewUser,
    refreshAccessToken
}