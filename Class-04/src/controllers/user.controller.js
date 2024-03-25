import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


/** 
 * STEPS BREAK-DOWN
 * 
 * (1) Get user-details from Frontend
 * (2) Validation, (not empty)
 * (3) check, if user already exist
 * (4) check for images, (validate - Avatar)
 * (5) Create User object (Create entry in Database)
 * (6) Remove password and refresh token field from response
 * (7) return
 */

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, email, password } = req.body;

    //input validation
    if ([username, fullName, email, password].some((field) => {
        return field?.trim() === ""
    })) {
        throw new ApiError(400, "All fields are required")
    }

    //checking with existing user

    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(404, "user with email or username already exists")
    }

    //get reference or locaPath of uploading file

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    //file uploading on Cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    //Creating user entry

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    //Removing password & refreshToken from response

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registrying the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export { registerUser }