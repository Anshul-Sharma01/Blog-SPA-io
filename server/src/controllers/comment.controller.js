import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";




const getBlogComments = asyncHandler ( async(req, res, next) => {
    try{
        const { blogId } = req.params;

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        const blogComments = await Comment.find({ blog : blogId }).populate("owner","username avatar");

        if(blogComments.length === 0){
            return res.status(200).json(
                new ApiResponse(200, blogComments, "No comments yet")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, blogComments, "Blog Comments successfully fetched")
        );

    }catch(err){
        throw new ApiError(400, err?.message ||  "Error occurred while fetching the blog comments");
    }
})

const addComment = asyncHandler(async (req, res, next) => {
    try{
        const { blogId } = req.params;
        const userId = req.user._id;
        const { content } = req.body;
        console.log("content", content);

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        if(!content){
            throw new ApiError(400, "Content is required !!");
        }

        const newComment = await Comment.create({
            owner : userId,
            blog : blogId,
            content
        })

        if(!newComment){
            throw new ApiError(400, "Comment not created !! ");
        }

        return res.status(201).json(
            new ApiResponse(201, newComment,"Comment created Successfully")
        );
        
    }catch(err){
        throw new ApiError(400, "Error occurred while adding a new comment");
    }
})

const updateComment = asyncHandler(async (req, res, next) =>{
    try{
        const { commentId } = req.params;
        const userId = req.user._id;
        const { content } = req.body;

        if(!isValidObjectId(commentId)){
            throw new ApiError(400, "Invalid Comment Id");
        }
        if(!content){
            throw new ApiError(400, "Comtent is required");
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $set : content },
            { new : true }
        );

        if(!updatedComment){
            throw new ApiError(400, "Comment not updated !!");
        }

        return res.status(200).json(
            new ApiResponse(200, updatedComment, "Comment Updated Successfully")
        );
    }catch(err){
        throw new ApiError(400, "Error occurred while updating a comment");
    }
})

const deleteComment = asyncHandler(async(req, res, next) => {
    try {
        const { commentId } = req.params;
        console.log("Comment ID:", commentId);

        
        if (!isValidObjectId(commentId)) {
            throw new ApiError(400, "Invalid Comment Id");
        }

        
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new ApiError(404, "Comment not found");
        }


        const deletedComment = await Comment.findByIdAndDelete(commentId);

        
        return res.status(200).json(
            new ApiResponse(200, deletedComment, "Comment deleted successfully")
        );

    } catch (err) {
        throw new ApiError(400, `Error occurred while deleting the comment: ${err.message}`);
    }
});

export {
    getBlogComments,
    addComment,
    updateComment,
    deleteComment
}

