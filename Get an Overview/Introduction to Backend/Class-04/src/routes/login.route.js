import { Router } from "express";
import userLogin from "../controllers/userLogin.controller.js";

const loginRouter = Router()

loginRouter
    .route('/login')
    .post(userLogin)

export default loginRouter