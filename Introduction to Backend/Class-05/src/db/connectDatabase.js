import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDatabase = async function () {
    try {
        let connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log("Database connected successfully")
        // console.log(connectionInstance)
    } catch (error) {
        console.log("Something went wrong while connecting database")
    }
}

export default connectDatabase