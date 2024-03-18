import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

const app = express()

    ; (async () => {
        try {
            await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
            app.on("error", (error) => {
                console.error("server is not listening");
                throw error;
            })
            app.listen(process.env.PORT, () => {
                console.log(`Server is listening on http://localhost: ${process.env.PORT}`)
            })
        } catch (error) {
            console.error('DB is unable to connect!!!');
            throw error;
        }
    })