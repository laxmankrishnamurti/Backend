import { Router } from "express";
import { getUser } from "../controllers/getUser.controller.js";
import createUser from "../controllers/createUser.controller.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";

const userRouter = Router()

userRouter
    .route('/register')
    .get(protectRoute, getUser)
    .post(createUser)


export default userRouter