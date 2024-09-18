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
    },
    numberOfLikes : {
        type : Number,
        default : 0,
        minLength : [0, "Number of Likes can't be less than zero"]
    }
}, {
    timestamps : true
})

export const Blog = model("Blog", blogSchema);