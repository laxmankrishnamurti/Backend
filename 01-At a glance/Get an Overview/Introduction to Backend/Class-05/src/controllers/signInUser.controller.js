import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const signInUser = asyncHandler(async function (req, res) {
    let { username, email, password, confirmPassword } = req.body

    // if ([username, email, password, confirmPassword].some((field) => {
    //     return field?.trim() === ""
    // })) {
    //     throw new ApiError(400, "All fields are reqiured")
    // }

    if (!(username && email && password && confirmPassword)) {
        throw new ApiError(400, "All fields are reqiured")
    }

    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExist) {
        throw new ApiError(404, "user with email or username already exist")
    }

    let newUser = await User.create({
        username,
        email,
        password,
        confirmPassword
    })

    let createdUser = await User.findById(newUser._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while signing the user")
    }

    return res.json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})

export default signInUser