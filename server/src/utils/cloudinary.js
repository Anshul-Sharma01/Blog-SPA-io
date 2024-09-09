import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET 
})



const uploadOnCloudinary = async (LocalFilePath) => {
    try {
        if (!LocalFilePath) {
            throw new Error("No file path provided");
        }

        const response = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type: "auto"
        });

        // Ensure file is deleted after successful upload
        fs.unlinkSync(LocalFilePath);
        return response;

    } catch (err) {
        console.log("Cloudinary error:", err);
        // Ensure file is deleted even in case of error
        if (LocalFilePath && fs.existsSync(LocalFilePath)) {
            fs.unlinkSync(LocalFilePath);
        }
        throw new Error("Failed to upload file to Cloudinary");
    }
};


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
    uploadOnCloudinary,
    deleteFromCloudinary
};






