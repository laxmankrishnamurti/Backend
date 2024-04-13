import User from "../models/user.model.js"

const getUser = async function (req, res) {
    const getAllUsers = await User.find()
    const firstUser = await User.findOne({ username: "laxmankrishnamurti" })
    res.json({
        "message": "List of all users which is already saved in our database",
        "users": getAllUsers
    })
}

export { getUser }