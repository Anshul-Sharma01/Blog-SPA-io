import { Mongoose, Schema, model } from "mongoose";


const blogSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title :  { 
        type : String,
        required : [true, "Title is required"],
        trim : true,
    },
    content : {
        type : String,
        required : [true, "Content is required"]
    },
    thumbnail : {
        public_id : {
            type : String,
            required : true
        },
        secure_url : {
            type : String,
            required : true
        }
    }
}, {
    timestamps : true
})

export const Blog = model("Blogs", blogSchema);