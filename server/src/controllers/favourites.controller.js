import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Favourites } from "../models/favourites.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";




const toggleFavourite = asyncHandler(async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const { blogUserId } = req.body;
        const userId = req.user._id;
        console.log(blogUserId);
        console.log(blogId);
        

        if (!isValidObjectId(blogId)) {
            throw new ApiError(400, "Invalid Blog Id");
        }

        if (!isValidObjectId(blogUserId)) {
            throw new ApiError(400, "Invalid blog User Id");
        }

        const blogExists = await Favourites.findOne({ blog: blogId, owner: userId });

        if (blogExists) {
            
            await blogExists.deleteOne();
            await User.findByIdAndUpdate(userId, {
                $pull: { favourites: blogId }
            });

            return res.status(200).json(new ApiResponse(200, blogExists, "Blog removed from Favourites"));
        }


        const favBlog = await Favourites.create({
            blog: blogId,
            owner: userId,
            blogOwner: blogUserId
        });

        await User.findByIdAndUpdate(userId, {
            $push: { favourites: blogId }
        });

        return res.status(201).json(new ApiResponse(201, favBlog, "Blog added to Favourites"));
    } catch (err) {
        throw new ApiError(400, err?.message || "Error occurred while toggling Favourite");
    }
});


const getAllFavourites = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;

        const favouriteBlogs = await Favourites.find({ owner: userId })
            .populate("owner", "username name _id")
            .populate("blog", "_id thumbnail title numberOfLikes")
            .populate("blogOwner", "username name _id");

        if (favouriteBlogs.length === 0) {
            return res.status(200).json(new ApiResponse(200, [], "You haven't added any blog to favourites"));
        }
        return res.status(200).json(new ApiResponse(200, favouriteBlogs, "Favourite blogs fetched"));
    } catch (err) {
        throw new ApiError(400, err?.message || "Error occurred while fetching favourite blogs");
    }
});


const getFavouriteCountForBlog = asyncHandler(async (req, res, next) => {
    try{
        const { blogId } = req.params;

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        const countFavourites = await Favourites.find({blog : blogId}).countDocuments();

        if(countFavourites === 0){
            return res.status(200).json(new ApiResponse(200, [], "No-one has favourited yet"));
        }

        return res.status(200).json(new ApiResponse(200, {countFavourites}, "Fetched count of stars" ));


    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while fetching count of favourites");
    }
})


const clearAllFavourites = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;
        await Favourites.deleteMany({ owner: userId });
        await User.findByIdAndUpdate(userId, {
            $set: { favourites: [] }
        });

        return res.status(200).json(new ApiResponse(200, [], "Favourites list wiped off"));
    } catch (err) {
        throw new ApiError(400, err?.message || "Error occurred while removing all favourites");
    }
});


const getFavouriteBlogsByOwner = asyncHandler(async(req, res,next) => {
    try{
        const { blogUserId } = req.params;
    
        if(!isValidObjectId(blogUserId)){
            throw new ApiError(400, "Invalid Blog Owner Id");
        }

        const favBlogs = await Favourites.find({ blogOwner : blogUserId }).populate("blog");
        if(favBlogs.length === 0){
            return res.status(200).json(new ApiResponse(200, [], "No Favourite blogs found"));
        }

        return res.status(200).json(new ApiResponse(200, favBlogs, "Favourite blogs fetched"));

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while finding favourite blogs of a particular user");
    }
})


export{
    toggleFavourite,
    getAllFavourites,
    getFavouriteCountForBlog,
    clearAllFavourites,
    getFavouriteBlogsByOwner
}