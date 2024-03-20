import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

connectDB()








// import mongoose from "mongoose"
// import { DB_NAME } from "./constants.js"
// import express from "express"

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.error('app is unable to communicate with the database')
//         })
//         console.log("trying......")
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is listening on http://localhost:${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error('Unable to connect databse:', error)
//     }
// })