import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}));

app.use(morgan('dev'));
app.use(express.json({ limit : "10mb"}));
app.use(express.urlencoded({ limit: '10mb', extended:true, }));
app.use(cookieParser());
app.use(express.static("public"));

import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import favouritesRoutes from "./routes/favourites.routes.js";
import serverCheckRouter from "./routes/serverCheck.routes.js";

// app.use((req, res, next) => {
//     req.setTimeout(5000); // 5 seconds timeout
//     next();
// });


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/favourites", favouritesRoutes);
app.use("/api/v1/server", serverCheckRouter);

export { app }; 












