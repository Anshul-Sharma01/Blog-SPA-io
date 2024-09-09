import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { clearAllFavourites, getAllFavourites, getFavouriteBlogsByOwner, getFavouriteCountForBlog, toggleFavourite } from "../controllers/favourites.controller.js";



const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllFavourites);
router.route("/fav/:blogId").post(toggleFavourite);
router.route("/countfav/:blogId").post(getFavouriteCountForBlog);
router.route("/clear").delete(clearAllFavourites);
router.route("/:blogUserId").get(getFavouriteBlogsByOwner);


export default router;


