import Router from "express";
import { deleteUser, fetchAllUsers, getTotalCount } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyAdmin);


router.route("/get-total-count").get(getTotalCount);
router.route("/get-all-users").get(fetchAllUsers);
router.route("/user/delete/:userId").delete(deleteUser);

export default router;
