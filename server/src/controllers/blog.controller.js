import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const viewAllBlogs = asyncHandler ( async (req, res, next) => {

})

const viewMyBlogs = asyncHandler ( async( req, res, next) => {

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
