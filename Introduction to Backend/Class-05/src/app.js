import cookieParser from "cookie-parser"
import express from "express"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//Importing routes
import userRouter from "./routes/user.route.js"

//Routes function declaration
app.use('/api/v1/user', userRouter)

export { app }