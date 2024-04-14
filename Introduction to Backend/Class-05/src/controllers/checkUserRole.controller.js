import { User } from "../models/user.model.js";

const checkUserRole = async function (req, res, next) {
    let userDetails = req.body.username;
    let fetchedUser = await User.findOne({ username: `${userDetails}` })

    if (fetchedUser.role === 'admin') {
        next()
    } else {
        res.json({
            "message": "unauthorized action",
            "status": 403
        })
    }
}

export default checkUserRole