import Router from "express";
import { deleteUser, fetchAllComments, fetchAllPosts, fetchAllUsers, getTotalCount, updateUserRole } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyAdmin);


router.route("/get-total-count").get(getTotalCount);
router.route("/get-all-users").get(fetchAllUsers);
router.route("/user/delete/:userId").delete(deleteUser);
router.route("/get-all-comments").get(fetchAllComments);
router.route("/get-all-posts").get(fetchAllPosts);
router.route("/update-role/:userId").get(updateUserRole);

export default router;
