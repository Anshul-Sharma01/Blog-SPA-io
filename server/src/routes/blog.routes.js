import { Router } from "express";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { createBlog, deleteBlog, fetchAllBlogs, fetchBlogsByCategory, fetchMyBlogs, updateBlogDetails, updateBlogThumbnail, viewBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router();

router.route("/viewall").get(fetchAllBlogs);
router.route("/view/category/:category").get(fetchBlogsByCategory);
router.route("/view/:blogId").get(viewBlog);
router.route("/my").get(verifyJWT, fetchMyBlogs);
router.route("/create").post(verifyJWT, upload.single("thumbnail"), createBlog);
router.route("/update/:blogId").patch(verifyJWT, updateBlogDetails);
router.route("/thumbnail/update/:blogId").patch(verifyJWT, upload.single("thumbnail"), updateBlogThumbnail);
router.route("/delete/:blogId").get(verifyJWT, deleteBlog);


export default router;