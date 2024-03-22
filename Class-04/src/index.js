import { app } from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

const serverPort = process.env.PORT;

connectDB()
    .then(() => {

        app.on("error", () => {
            console.log(error)
            throw error;
        })

        app.get("/", (req, res) => {
            res.send('Server is running on localhost.')
        })

        //The way we define port number prevents from server crashing.
        app.listen(serverPort || 8000, () => {
            console.log(`Sever is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error('MongoDB connection failed!!!', error)
    })
























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