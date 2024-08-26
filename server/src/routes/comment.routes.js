import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"; 
import { addComment, deleteComment, getBlogComments, updateComment } from "../controllers/comment.controller.js";


const router = Router();


router.use(verifyJWT);


router.route("/:blogId")
.get(getBlogComments)
.post(addComment);

router.route("/c/:commentId")
.delete(deleteComment)
.patch(updateComment);







export default router;









