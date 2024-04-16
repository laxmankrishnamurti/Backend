import Router from "express"
import signInUser from "../controllers/signInUser.controller.js"
import loginUser from "../controllers/loginUser.controller.js"
import verifyToken from "../middlewares/verifyToken.middleware.js"
import getAllUsers from "../controllers/getAllUsers.controller.js"
import checkUserRole from "../controllers/checkUserRole.controller.js"
import updateProfile from "../controllers/updateProfile.controller.js"
import forgetPassword from "../controllers/forgetPassword.controller.js"
import getResetToken from "../controllers/getResetToken.controller.js"

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

userRouter
    .route('/updateProfile')
    .patch(verifyToken, updateProfile)

userRouter
    .route('/forgetPassword')
    .post(forgetPassword)

userRouter
    .route('/resetPassword')
    .get(getResetToken)

export default userRouter