import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const viewAllBlogs = asyncHandler ( async (req, res, next) => {
    try{
        let { page, limit } = req.query;
        page = parseInt(page) || 3;
        limit = parseInt(limit) || 3;


        const skip = ( page - 1 ) * limit;

        const allBlogs = await Blog.find({})
        .skip(skip)
        .limit(limit)
        .populate("owner", "username name");

        if(allBlogs.length === 0){
            throw new ApiError(400,"Blogs doesn't exists");
        }

        const totalBlogs = await Blog.countDocuments();

        return res.status(200).json(
            new ApiResponse(200,{
                allBlogs,
                totalBlogs,
                totalPages : Math.ceil(totalBlogs / limit),
                currentPage : page
            },
            "All Blogs Fetched Successfully"
        )
        )

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while fetching blogs");
    }
})

const viewMyBlogs = asyncHandler ( async( req, res, next) => {
    try{
        let { page, limit } = req.query;
        const userId = req.user._id;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;

        const skip = ( page - 1 ) * limit;

        const myBlogs = await Blog.find({ owner : userId })
        .skip(skip)
        .limit(limit);

        if(myBlogs.length === 0){
            throw new ApiError(400, "The user does not have any blogs");
        }

        const totalBlogs = await Blog.countDocuments({ owner : userId });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    myBlogs,
                    totalBlogs,
                    totalPages : Math.ceil(totalBlogs / limit),
                    currentPage : page
                },
                "Personal blogs fetched successfully"
            )
        )


    }catch(err){
        throw new ApiError(400, err?.message || "Failed to fetch personal blogs");
    }
})

const createBlog = asyncHandler(async (req, res, next) => {

})

const updateBlogDetails = asyncHandler ( async( req, res, next) => {

})

const updateBlogThumbnail = asyncHandler( async( req, res, next) => {

})

const deleteBlog = asyncHandler ( async(req, res, next) => {

})


export {
    viewAllBlogs,
    viewMyBlogs,
    createBlog,
    updateBlogDetails,
    updateBlogThumbnail,
    deleteBlog
}
