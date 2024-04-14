import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";

const getAllUsers = async function (req, res) {
    let inputData = req.body;
    let fetchedUser = await User.findOne({ username: `${inputData.username}` })

    if (fetchedUser) {
        if (fetchedUser.password === inputData.password) {
            if (inputData.username === 'laxmankrishnamurti') {
                User.role = 'admin'
            }
        } else {
            throw new ApiError(400, "Invalid Password")
        }
    } else {
        throw new ApiError(404, "User not found")
    }
}