import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Route Import 
import userRouter from "./routes/user.route.js"

// Route application 
app.use('/api/v1/user', userRouter)


export { app }