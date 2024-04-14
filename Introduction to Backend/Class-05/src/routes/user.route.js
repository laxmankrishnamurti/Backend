import Router from "express"
import signInUser from "../controllers/signInUser.controller.js"
import loginUser from "../controllers/loginUser.controller.js"
import verifyToken from "../middlewares/verifyToken.middleware.js"
import getAllUsers from "../controllers/getAllUsers.controller.js"
import checkUserRole from "../controllers/checkUserRole.controller.js"

const userRouter = Router()

userRouter
    .route('/signIn')
    .post(signInUser)

userRouter
    .route('/login')
    .post(loginUser)

userRouter
    .route('/admin')
    .get(checkUserRole, getAllUsers)


export default userRouter