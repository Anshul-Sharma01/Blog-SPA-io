import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTotalCount = asyncHandler(async(req, res, next) => {
    try{
        const totalUsers = await User.countDocuments();

        const totalPosts = await Blog.countDocuments();

        const totalComments = await Comment.countDocuments();

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalUsers,
                    totalPosts,
                    totalComments
                },
                "Total Counts fetched Successfully"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching the total count : ${err}`);
        throw new ApiError(400, err?.message || "Internal BackEnd Error");
    }
})

const fetchAllUsers = asyncHandler(async(req, res, next) => {
    try{
        const allUsers = await User.find({});

        if(allUsers.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    allUsers,
                    "No User has registered yet"
                )
            )
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allUsers,
                "Successfully fetched all users"
            )
        )

    }catch(err){
        console.error(400, `Error occurred while fetching all users : ${err}`);
        throw new ApiError(400, "Error occurred while fetching all users");
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
            new ApiResponse(200, deletedUser, "User deleted Successfully")
        );

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while deleting the user");
    }
})

const fetchAllComments = asyncHandler(async(req, res, next) => {
    try{
        const allComments = await Comment.find({});
        if(allComments.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    allComments,
                    "No User has commented yet !!"
                )
            )
        }


        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allComments,
                "All comments fetched Successfully"
            )
        ) 
    }catch(err){
        console.error(`Error occurred while fetching all comments : ${err}`);
        throw new ApiError(400, "Error occurred while fetching all comments");
    }
})



export {
    getTotalCount,
    fetchAllUsers,
    deleteUser
}