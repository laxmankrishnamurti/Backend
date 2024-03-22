import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

//1. Configuration for resource sharing over Cross Origin
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))


/*
2. Configuration for receiving data which is coming from
Limitation : This is only for receiving json data not a file
Solution : install "multer-package"
*/

app.use(express.json({
    limit: "16kb"
}))

//3. Configuring requests which are coming from url 
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

//4. Configuration for Public files
app.use(express.static("Public"))

//5. Configuration for user cookies
app.use(cookieParser())

export { app }