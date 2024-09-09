import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const serverCheck = asyncHandler(async(req, res, next) => {
    try{
        res.status(200)
        .json(
            new ApiResponse(200, {}, "Server running successfully")
        );
    }catch(err){
        throw new ApiError(400, "Error occurred in server...");
    }
})


export { 
    serverCheck
}