import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getLikedBlogs, toggleBlogLike, toggleCommentLike } from "../controllers/like.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/toggle/b/:blogId")
.post(toggleBlogLike);
router.route("/toggle/c/:commentId")
.post(toggleCommentLike);
router.route("/blogs")
.get(getLikedBlogs);


export default Router;
