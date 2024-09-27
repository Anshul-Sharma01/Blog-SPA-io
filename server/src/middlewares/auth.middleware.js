import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async (req, _, next) => {
    try{
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer", " ");
        // console.log("Cookies : ", req.cookies);
        // console.log("Token : ",token);

        if(!token){
            throw new ApiError(403, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(403, "Invalid Access Token");
        }
        req.user = user;
        next();
    }catch(err){
        console.log("401 yahan se bheja gaya!!");
        throw new ApiError(403, err?.message || "Invalid acceess Token");
    }
})



export const verifyAdmin = asyncHandler(async (req, _, next) => {
    try{
        const { user } = req;
        
        if(!user || user.role !== 'ADMIN'){
            throw new ApiError(403, "Access forbidden");
        }

        next();

    }catch(err){
        throw new ApiError(403, err?.message || "Access to this particular route is forbidden");
    }
})



