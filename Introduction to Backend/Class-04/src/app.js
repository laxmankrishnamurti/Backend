import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

// Route Import 
import userRouter from "./routes/user.route.js"
import loginRouter from "./routes/login.route.js"

// Route application 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/user', loginRouter)

export { app }