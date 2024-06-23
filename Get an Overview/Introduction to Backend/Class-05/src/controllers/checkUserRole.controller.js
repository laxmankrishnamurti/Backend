import { User } from "../models/user.model.js";

const checkUserRole = async function (req, res, next) {
    // let userDetails = req.body.username;
    let userDetails = req.cookies.username
    let fetchedUser = await User.findOne({ username: `${userDetails}` })

    if (fetchedUser.role === 'admin' && userDetails === 'laxmankrishnamurti') {
        next()
    } else {
        res.json({
            "message": "unauthorized action",
            "status": 403
        })
    }
}

export default checkUserRole