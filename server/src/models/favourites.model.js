import mongoose, { Schema } from "mongoose";


const favouritesSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    blog : {
        type : Schema.Types.ObjectId,
        ref : "Blog",
        required : true
    },
    blogOwner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {
    timestamps : true
})


export const Favourites = mongoose.model("Favourites", favouritesSchema);

