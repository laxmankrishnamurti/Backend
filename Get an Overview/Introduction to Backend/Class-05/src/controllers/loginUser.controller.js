import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateJWTTokens from "../middlewares/generateTokens.middleware.js";

const loginUser = async function (req, res) {
    let inputData = req.body;
    let fetchUser = await User.findOne({ username: `${inputData.username}` })

    if (fetchUser) {
        let password = fetchUser.password
        if (password === inputData.password) {
            let generatedToken = await generateJWTTokens(inputData.username, inputData.password)
            res.cookie(
                "token", generatedToken
            )
            res.cookie(
                "username", inputData.username
            )
            res.json(
                new ApiResponse(200, "User logged in successfully")
            )
        } else {
            throw new ApiError(400, "Incorrect Password")
        }
    } else {
        throw new ApiError(404, "User not found")
    }
}

export default loginUser