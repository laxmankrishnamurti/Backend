import { User } from "../models/user.model.js"

const userLogin = async function (req, res) {
    try {
        let loginDetails = req.body
        let isExist = await User.findOne({ email: `${loginDetails.email}` })
        let isCorrect = await User.findOne({ password: `${loginDetails.password}` })
        if (isExist && isCorrect) {
            res.cookie(
                "isLoggedIn", true,
                { maxAge: 1000 * 60 * 60 * 24 },
                "httpOnly", true
            )
            res.json({
                "message": "User logged in successfully",
                "status": 202
            })
        } else {
            res.send({
                "message": "Invalid user credientials",
                "status": 404
            })
        }
    } catch (error) {
        console.log('Something went wrong while user login', error)
    }
}

export default userLogin