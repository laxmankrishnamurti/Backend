import Router from "express"
import signInUser from "../controllers/signInUser.controller.js"
import { User } from "../models/user.model.js"

const userRouter = Router()

userRouter
    .route('/signIn')
    .get(getSignInUser)
    .post(signInUser)

async function getSignInUser(req, res) {
    let findUser = await User.find()
    console.log(findUser)
    res.json({
        "message": "List of all users that is sotred into database",
        "users": findUser
    })
}
export default userRouter