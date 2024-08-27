import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToFavourite, removeFromFavourite } from "../controllers/favourites.controller.js";



const router = Router();

app.use(verifyJWT);

router.route("/add/:blogId").post(addToFavourite);
router.route("/remove/:blogId").post(removeFromFavourite);

export default router;


