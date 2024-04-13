import { Router } from "express";
import { getUser } from "../controllers/getUser.controller.js";
import createUser from "../controllers/createUser.controller.js";

const userRouter = Router()

userRouter
    .route('/register')
    .get(getUser)
    .post(createUser)


export default userRouter