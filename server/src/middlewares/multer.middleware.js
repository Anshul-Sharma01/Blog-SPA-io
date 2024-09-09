import multer from "multer";

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, `F:\Web Dev Project\Blog-SPA-io\server\src\public\temp`);
    },
    filename : function(req, file, cb){
        cb(null, file.originalname + "-" + Date.now());
    }
})


export const upload = multer({
    storage
})


