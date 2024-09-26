import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";


const toggleBlogLike = asyncHandler(async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        if (!isValidObjectId(blogId)) {
            throw new ApiError(400, "Invalid Blog Id");
        }

        const likedBlog = await Like.findOne({ likedBy: userId, blog: blogId });

        if (likedBlog) {

            await likedBlog.deleteOne();

            const blog = await Blog.findByIdAndUpdate(
                blogId,
                { $inc: { numberOfLikes: -1 } },
                { new: true }
            );


            if (blog.numberOfLikes < 0) {
                blog.numberOfLikes = 0;
                await blog.save();
            }

            return res.status(200).json(new ApiResponse(200, likedBlog, "Blog Like removed successfully"));
        } else {

            const blog = await Blog.findByIdAndUpdate(
                blogId,
                { $inc: { numberOfLikes: 1 } },
                { new: true }
            );

            const blogLiked = await Like.create({
                likedBy: userId,
                blog: blogId
            });

            return res.status(201).json(new ApiResponse(201, blogLiked, "Blog Liked successfully"));
        }
    } catch (err) {
        throw new ApiError(400, `Error occurred while toggling Blog like: ${err}`);
    }
});


const toggleCommentLike = asyncHandler(async(req, res, next) => {
    try{
        const { commentId } = req.params;
        console.log(commentId);
        const userId = req.user._id;

        if(!isValidObjectId(commentId)){
            throw new ApiError(400, 'Invalid Comment Id');
        }

        const likedComment = await Like.findOne({likedBy : userId, comment : commentId});
        if(likedComment){
            await likedComment.deleteOne();
            await Comment.findByIdAndUpdate(
                commentId,
                {$inc : { totalLikes : -1 }},
            )
            return res.status(200).json(new ApiResponse(200, likedComment, "Comment Liked Removed Successfully"));
        }else{
            const commentLiked = await Like.create({
                likedBy : userId,
                comment : commentId
            });
            await Comment.findByIdAndUpdate(
                commentId,
                {$inc : {totalLikes : 1}}
            )
            return res.status(201).json(new ApiResponse(201, commentLiked, "Comment Liked successfully"));
        }

    }catch(err){
        throw new ApiError(400, "Error occurred while toggling comment like");
    }
})

const getLikedBlogs = asyncHandler(async(req, res, next) => {
    try{
        const userId = req.user._id;

        const likedBlogs = await Like.find({ likedBy : userId, blog : {$exists : true}}).populate("blog");

        if(likedBlogs.length === 0){
            return res.status(200).json(new ApiResponse(200, likedBlogs, "No Liked blogs Found"));
        }else{
            return res.status(200).json(new ApiResponse(200, likedBlogs, "Liked blogs fetched successfully"));
        }

    }catch(err){
        throw new ApiError(400, "Error occured while fetching all liked blogs");
    }
})

export {
    toggleBlogLike,
    toggleCommentLike,
    getLikedBlogs
}



