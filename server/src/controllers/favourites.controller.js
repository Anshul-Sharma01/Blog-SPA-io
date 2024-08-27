import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Favourites } from "../models/favourites.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const addToFavourite = asyncHandler(async(req, res, next) => {
    try{
        const { blogId } = req.params;
        const userId = req.user._id;
        const { blogUserId } = req.body;
        
        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        const blogFavourite = await Favourites.create({
            blogOwner : blogUserId,
            owner : userId,
            blog : blogId
        })

        if(!blogFavourite){
            throw new ApiError(400, "Some Error occurred while adding blog to favourites list");
        }

        return res.status(201).json(new ApiResponse(201, blogFavourite, "Blog added to Favourites"));

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while adding to favourites");
    }
})

const removeFromFavourite = asyncHandler(async (req, res, next) => {
    try{
        const { blogId } = req.params;
        const  userId = req.user._id;

        if(!isValidObjectId(blogId)){
            throw new ApiError(400,"Invalid Blog Id");
        }

        const blogExists = await Favourites.findOne({ blog : blogId, owner : userId });

        if(!blogExists){
            throw new ApiError(400, "Blog is already not in the favourites list");
        }

        await blogExists.deleteOne();
        return res.status(200).json(new ApiResponse(200, [], "Blog removed from favourites"));


    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while removing blog from favourites");
    }
})





export{
    addToFavourite,
    removeFromFavourite
}
