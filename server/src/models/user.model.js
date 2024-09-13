import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import crypto from "crypto";



const userSchema = new Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username already exists"],
        trim : true,
        lowercase : true,
        minLength : [5, "Username should be of atleast 5 characters"],
        maxLength : [18, "Username should be less than 18 characters"],
    },
    name : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email already exists"],
        lowercase : true,
        trim : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please fill in a valid email address"
        ]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minLength : [8, "Password must be of atleast 8 characters"],
        select:  false
    },
    role : {
        type : String,
        enum : ['USER','ADMIN'],
        default : 'USER'
    },
    blogCount : {
        type : Number,
        default : 0,
        minLength : [0, "Blog Count can't be less than 0"],
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        secure_url : {
            type : String,
            required : true
        }
    },
    refreshToken : {
        type : String
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
}, {
    timestamps : true
})


userSchema.pre('save', async function ( next ){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

userSchema.methods = {
    generateAccessToken :  function(){
        return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                username : this.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    },

    generateRefreshToken :  function(){
        return jwt.sign(
            {
                _id : this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    },
    
    isPasswordCorrect: async function(password) {
        if (!password || typeof password !== 'string') {
            throw new Error("Password must be a string");
        }
        // 'this.password' will refer to the hashed password fetched from the database
        return await bcryptjs.compare(password, this.password);
    },
    generatePasswordResetToken : async function() {
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
        return resetToken;
    }
}



export const User = mongoose.model("User", userSchema);








