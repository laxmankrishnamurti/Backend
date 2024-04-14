import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"

const verifyToken = async function (req, res, next) {
    let token = req.cookies.token
    let secretKey = process.env.SECRET_KEY

    let isVerified = jwt.verify(token, secretKey)
    if (isVerified) {
        next()
    } else {
        throw new ApiError(400, "Token dosen't matched")
    }
}

export default verifyToken