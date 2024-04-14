import Router from "express"
import signInUser from "../controllers/signInUser.controller.js"
import loginUser from "../controllers/loginUser.controller.js"

const userRouter = Router()

userRouter
    .route('/signIn')
    .post(signInUser)

userRouter
    .route('/login')
    .post(loginUser)

userRouter
    .route('/admin')
// .get(getAllUsers)


export default userRouter