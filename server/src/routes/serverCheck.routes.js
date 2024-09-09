import { Router } from "express";
import { serverCheck } from "../controllers/servercheck.controller.js";

const router = Router();

router.route("/check")
.get(serverCheck);

export default router;

