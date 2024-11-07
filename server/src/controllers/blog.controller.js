import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";



const fetchAllBlogs = asyncHandler(async (req, res, next) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1; 
        limit = parseInt(limit) || 3;

        const skip = (page - 1) * limit;

        
        const totalBlogs = await Blog.countDocuments();


        if (totalBlogs === 0) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        allBlogs: [],
                        totalBlogs,
                        totalPages: 0,
                        currentPage: page
                    },
                    "Blogs don't exist"
                )
            );
        }

        const totalPages = Math.ceil(totalBlogs / limit);


        // const allBlogs = await Blog.aggregate([
        //     { $sample: { size: totalBlogs } }, 
        //     { $skip: (page - 1) * limit },     
        //     { $limit: limit },                 
        //     {
        //         $lookup: {                      
        //             from: "users",              
        //             localField: "owner",
        //             foreignField: "_id",
        //             as: "owner"
        //         }
        //     },
        //     {
        //         $unwind: "$owner"        
        //     },
        //     {
        //         $project: {                     
        //             _id: 1,
        //             title: 1,
        //             content: 1,
        //             thumbnail: 1,
        //             numberOfLikes : 1,
        //             "owner.username": 1,
        //             "owner.name": 1,
        //             blogUserId: "$owner._id"
        //         }
        //     }
        // ]);

        const allBlogs = await Blog.find({})
        .populate({
            path: "owner", 
            select: "username name"  
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);




        
        if (allBlogs.length === 0) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        allBlogs: [],
                        totalBlogs,
                        totalPages,
                        currentPage: page
                    },
                    "No blogs found on this page"
                )
            );
        }

        
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    allBlogs, 
                    totalBlogs,
                    totalPages,
                    currentPage: page
                },
                "All Blogs Fetched Successfully"
            )
        );
    } catch (err) {
        throw new ApiError(400, err?.message || "Error occurred while fetching blogs");
    }
});

const fetchBlogsByTitleOrCategory = asyncHandler(async(req, res, next) => {
    try{
        let { query, page, limit } = req.query;
        if(!query){
            throw new ApiError(400, "No query is provided for searching....");
        }

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 6;

        const skip = (page - 1) * limit;

        const searchCondition = {
            $or : [
                { title : { $regex : query, options : "i" }},
                { category : { $regex : query, options : "i" } }
            ]
        };

        const totalBlogs = await Blog.countDocuments(searchCondition);
        if(totalBlogs === 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        blogs : [],
                        totalBlogs,
                        totalPages : 0,
                        currentPage : page
                    },
                    "No Blogs found matching the query"
                )
            )
        }

        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find(searchCondition)
        .skip(skip)
        .limit(limit)
        .populate("owner", "username name");

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    blogs, 
                    totalBlogs,
                    totalPages,
                    currentPage : page
                },
                "Blogs matching query fetched successfully"
            )
        )


    }catch(err){
        console.log(`Error occurred while fetching blogs by title or category : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while searching for blogs !!");
    }
})

const fetchLatestBlogsOfAuthor = asyncHandler(async(req, res, next) => {
    try{
        const { authorId } = req.params;
        if(!isValidObjectId(authorId)){
            throw new ApiError(400, "Invalid Author Id");
        }

        const latestBlogs = await Blog.find({ owner : authorId })
        .sort({ createdAt : -1 })
        .limit(6)
        .select("-numberOfLikes -content")
        .populate("owner", "username name");

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                latestBlogs,
                "Latest Blogs of the author fetched successfully"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching latest blogs of author : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while fetching latest blogs of author !!");
    }
})

const viewBlog = asyncHandler( async (req, res, next) => {
    try{
        const { blogId } = req.params;
        console.log(req.params);

        if(!isValidObjectId(blogId)){
            throw new ApiError(400, "Invalid Blog Id");
        }

        const blog = await Blog.findById(blogId)
        .populate("owner", "username name");

        if(!blog){
            throw new ApiError(404, "Blog not found");
        }
        
        return res.status(200).json(
            new ApiResponse(200, blog, "Blog Data Fetched Successfully")
        );

    }catch(err){
        throw new ApiError(400, `Error occurred while fetching the blog : ${err}`);
    }
})

const fetchMyBlogs = asyncHandler ( async( req, res, next) => {
    try{
        let { page, limit } = req.query;
        const userId = req.user._id;
        console.log("User id :",userId);

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
            return res.status(200).json(
                new ApiResponse(200, myBlogs, "User does not have any blogs")
            );
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

const fetchBlogsByCategory = asyncHandler(async(req, res, next ) => {
    try{
        let { page, limit } = req.query;
        const { category } = req.params;
        const userId = req.user?._id;
        console.log("User-Id : ", userId);

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 6;

        const skip = ( page - 1 ) * limit;

        const categoryBlogs = await Blog.find({ category })
        .skip(skip)
        .limit(limit);

        if(categoryBlogs.length === 0){
            return res.status(200).json(
                new ApiResponse(
                    200, 
                    categoryBlogs,
                    "No Blogs exists for specific category !!"
                )
            );
        }

        const totalBlogs = await Blog.countDocuments({ category });
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    blogs : categoryBlogs,
                    totalBlogs,
                    totalPages : Math.ceil(totalBlogs / limit),
                    currentPage : page
                },
                "Blogs for the specific category are fetched successfully"
            )
        )
        
    }catch(err){
        console.error(`Error occurred while fetching blogs by category : ${err}`);
        throw new ApiError(400, err?.message || "Failed to fetch blogs my category");
    }
})

const createBlog = asyncHandler(async (req, res, next) => {
    try{
        const { title, content, category } = req.body;
        const userId = req.user._id;

        // console.log("Title", title);
        // console.log(" and content : ", content);


        if(!title || !content || !category){
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
                category,
                thumbnail : {
                    public_id : thumbnail.public_id,
                    secure_url : thumbnail.secure_url
                }
            })

            if(!blog){
                throw new ApiError(400, "Error creating new blog");
            }

            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $inc : { blogCount : 1} 
                },
                {new : true}
            );


            return res.status(201).json(new ApiResponse(
                201,
                {
                    user,blog
                },
                "Blog created successfully"
            ))

        }else{
            throw new ApiError(400, "Thumbnail file is required");
        }

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurrd while creating a blog");
    }
})

const updateBlogDetails = asyncHandler(async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        const { blogId } = req.params;
        const userID = req.user._id;

        if (!isValidObjectId(blogId)) {
            throw new ApiError(400, "Invalid Blog Id");
        }

        if (!title && !content && !category) {
            throw new ApiError(400, "At least update one field");
        }


        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        if (blog.owner.toString() !== userID.toString()) {
            throw new ApiError(403, "You are not authorized to update this blog");
        }

        const updatedFields = {};
        if (title) {
            updatedFields.title = title;
        }
        if (content) {
            updatedFields.content = content;
        }
        if(category){
            updatedFields.category = category;
        }

        // console.log("Updated fields : ", updatedFields);

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedBlog) {
            throw new ApiError(400, "Error updating blog details");
        }

        return res.status(200).json(
            new ApiResponse(200, updatedBlog, "Blog details updated successfully")
        );

    } catch (err) {
        throw new ApiError(400, err?.message || "Error updating blog details");
    }
});

const updateBlogThumbnail = asyncHandler(async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const userID = req.user._id;

        if (!isValidObjectId(blogId)) {
            throw new ApiError(400, "Invalid Blog Id");
        }


        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        if (blog.owner.toString() !== userID.toString()) {
            throw new ApiError(403, "You are not authorized to update this blog thumbnail");
        }

        if (req.file) {
            const thumbnailLocalPath = req.file?.path;
            if (!thumbnailLocalPath) {
                throw new ApiError(400, "Please provide a new thumbnail");
            }

            const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
            if (!thumbnail) {
                throw new ApiError(400, "Error occurred while updating thumbnail on Cloudinary");
            }

            const updatedBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $set: {
                        thumbnail: {
                            public_id: thumbnail.public_id,
                            secure_url: thumbnail.secure_url,
                        },
                    },
                },
                { new: true }
            );

            if (!updatedBlog) {
                throw new ApiError(400, "Error occurred while updating the thumbnail");
            }

            return res.status(200).json(
                new ApiResponse(200, updatedBlog, "Blog Thumbnail updated successfully")
            );
        } else {
            throw new ApiError(400, "Thumbnail file is required");
        }
    } catch (err) {
        throw new ApiError(400, `Error occurred while updating the blog thumbnail: ${err}`);
    }
});

const deleteBlog = asyncHandler(async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const userID = req.user._id;

        if (!isValidObjectId(blogId)) {
            throw new ApiError(400, "Invalid Blog Id");
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        if (blog.owner.toString() !== userID.toString()) {
            throw new ApiError(403, "You are not authorized to delete this blog");
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            throw new ApiError(400, "Blog does not exist");
        }
        
        const author = await User.findByIdAndUpdate(
            userID,
            {$inc : {blogCount : -1}},
            {new : true}
        )

        return res.status(200).json(
            new ApiResponse(
                200, 
                {
                    user : author,
                    deleteBlog
                },
                "Blog deleted successfully")
        );

    } catch (err) {
        throw new ApiError(400, err?.message || "Error occurred while deleting the blog");
    }
});



export {
    fetchAllBlogs,
    fetchBlogsByTitleOrCategory,
    fetchBlogsByCategory,
    fetchLatestBlogsOfAuthor,
    viewBlog,
    fetchMyBlogs,
    createBlog,
    updateBlogDetails,
    updateBlogThumbnail,
    deleteBlog
}
