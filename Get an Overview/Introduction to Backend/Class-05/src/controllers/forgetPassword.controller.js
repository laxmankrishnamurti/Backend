import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const forgetPassword = async function (req, res) {
    let inputEmail = req.body.email;
    let fetchedUser = await User.findOne({ email: `${inputEmail}` })
    if (fetchedUser) {
        let getGeneratedToken;
        let generatedRefreshToken = async function () {
            let hexValues = "0123456789abcdefABCDEF";

            let randomNumber = "";
            for (let i = 0; i < hexValues.length; i++) {
                randomNumber +=
                    hexValues[Math.floor(Math.random() * hexValues.length)];
            }
            fetchedUser.resetToken = randomNumber;
            let updatedDocument = await fetchedUser.save()
            console.log(updatedDocument)
            getGeneratedToken = randomNumber;
        };
        generatedRefreshToken()
        console.log(getGeneratedToken)
        res.cookie(
            "resetToken", getGeneratedToken
        )
        res.json(
            new ApiResponse(201, "Token generated successfully")
        )
    }
    else {
        throw new ApiError(404, "User not found, Please signup first")
    }
}


export default forgetPassword