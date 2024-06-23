import { User } from "../models/user.model.js"

const getAllUsers = async function (req, res) {
    let allUsers = await User.find()

    res.json({
        "message": "This is the list of all users that is stored in our database",
        "users": allUsers
    })
}

export default getAllUsers