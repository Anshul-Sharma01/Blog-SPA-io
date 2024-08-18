import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})




const uploadOnCloudinary = async( LocalFilePath ) => {
    try{
        if(!LocalFilePath){
            return null;
        }

        const response = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type : "auto"
        }).catch((err) => {
            console.log("Cloudinary error : ", err);
        })

        fs.unlinkSync(LocalFilePath);
        return response;
        
    }catch(err){
        fs.unlinkSync(LocalFilePath);
        return null;
    }
}

const deleteFromCloudinary = async(pathId) => {
    try{
        const response = await cloudinary.uploader.destroy(
            pathId, {
                invalidate : true, resource_type : "auto"
            }
        )
        return response;
    }catch(err){
        console.log("Error in deleting the file from cloudinary");
        return null;
    }
}



export {
    uploadOnCloudinary
};






