import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";




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

        if(!isValidObjectId(userId)){
            throw new ApiError(400, "Invalid User Id");
        }

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
    try{
        const { title, content } = req.body;
        const userId = req.user._id;

        if(!title || !content){
            throw new ApiError(400, "All Fields are mandatory");
        }

        if(req.file){
            const thumbnailLocalPath = req.file.path;
            const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

            if(!thumbnail){
                throw new ApiError(400, "Error occurred while uploading thumbnail file");
            }

            const blog = await Blog.create({
                owner : userId,
                title,
                content,
                thumbnail : {
                    public_id : thumbnail.public_id,
                    secure_url : thumbnail.secure_url
                }
            })

            if(!blog){
                throw new ApiError(400, "Error creating new blog");
            }

            return res.status(201).json(new ApiResponse(
                201,
                blog,
                "BLog created successfully"
            ))

        }else{
            throw new ApiError(400, "Thumbnail file is required");
        }

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurrd while creating a blog");
    }
})

const updateBlogDetails = asyncHandler ( async( req, res, next) => {
    try{
        const { title, content } = req.body;
        const { blogId } = req.params;

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        if(!title && !content){
            throw new ApiError(400, "Atleast update one field");
        }

        const updatedFields = {};
        if(title){
            updatedFields.title = title;
        }
        if(content){
            updatedFields.content = content;
        }


        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {$set : updatedFields},
            {new : true}
        )

        if(!updatedBlog){
            throw new ApiError(400, "Error updating blog details");
        }

        return res.status(200).json(
            new ApiResponse(200, updatedBlog, "Blog details updated successfully")
        );

    }catch(err){
        throw new ApiError(400, err?.message || "Error updating blog details");
    }
})

const updateBlogThumbnail = asyncHandler( async( req, res, next) => {
    try{
        const { blogId } = req.params;

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        if(req.file){
            const thumbnailLocalPath = req.file?.path;
            if(!thumbnailLocalPath){
                throw new ApiError(400, "Please provide new thumbnail");
            }

            const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

            if(!thumbnail){
                throw new ApiError(400, "Error occurred while updating thumbnail on cloudinary" );
            }

            const updatedBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $set : {
                        thumbnail : {
                            public_id : thumbnail.public_id,
                            secure_url : thumbnail.secure_url
                        }
                    }
                },
                {new :true}
            )

            if(!updatedBlog){
                throw new ApiError(400, "Error occurred while updating the thumbnail");
            }

            return res.status(200).json(
                new ApiResponse(200, updatedBlog, "Blog Thumbnail updated successfully")
            );

        }else{  
            throw new ApiError(400, "Thumbnail file is required");
        }
    }catch(err){
        throw new ApiError(400, "Error occurred while updating the blog thumbnail");
    }
})

const deleteBlog = asyncHandler ( async(req, res, next) => {
    try{
        const { blogId } = req.params;

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if(!deletedBlog){
            throw new ApiError(400, "Blog does not exists");
        }
        
        return res.status(200).json(
            new ApiResponse(200, deletedBlog, "Blog deleted Successfully")
        );

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while deleting the blog");
    }
})


export {
    viewAllBlogs,
    viewMyBlogs,
    createBlog,
    updateBlogDetails,
    updateBlogThumbnail,
    deleteBlog
}
