import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }

},
    {
        timestamps: true
    }
)

/*
    This will generate problems, because if user will change anything in their profile then the password is going to change.

    userSchema.pre("save", function (next) {
    this.password = bcrypt.hash(this.password, 10)
    next
})*/

//For password Encryption

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    } else {
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
})

//For password validation (This is called Inheritance)

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Genrating access tokens

userSchema.methods.generateAccessTokens = function () {
    return jwt.sign(
        {
            _id: this._id,                 // Payloads (data)
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Generating refresh tokens 

userSchema.methods.generateRefreshTokens = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)