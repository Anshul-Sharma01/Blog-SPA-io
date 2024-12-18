import { Router } from "express";

import  {upload}  from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyAdmin }  from "../middlewares/auth.middleware.js";
import { changePassword, fetchAuthorProfile, forgotPassword,  getProfile, login, logout, refreshAccessToken, register, resetPassword, updateUser, updateUserAvatar } from "../controllers/user.controllers.js";


const router = Router();



router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/me").post(verifyJWT, getProfile);
router.route("/author/:authorId").get(fetchAuthorProfile);
router.route("/reset").post(forgotPassword);
router.route("/reset/:resetToken").post(resetPassword);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/update-profile").patch(verifyJWT, updateUser);
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/refresh-token").post(refreshAccessToken);





export default router;


