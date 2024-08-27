import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToFavourite, clearAllFavourites, getAllFavourites, getFavouriteBlogsByOwner, getFavouriteCountForBlog, removeFromFavourite, toggleFavourite } from "../controllers/favourites.controller.js";



const router = Router();

app.use(verifyJWT);

router.route("/").get(getAllFavourites);
router.route("/fav/:blogId").post(toggleFavourite);
router.route("/countfav/:blogId").post(getFavouriteCountForBlog);
router.route("/clear").delete(clearAllFavourites);
router.route("/:blogUserId").get(getFavouriteBlogsByOwner);


export default router;


