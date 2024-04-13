import User from "../models/user.model.js";

const createUser = async function (req, res) {
    const userData = req.body;
    const createdUser = await User.create(userData)
    res.json({
        "message": "user has been created successfully",
        "user": userData
    })
}

export default createUser