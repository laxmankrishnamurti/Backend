import { Mongoose } from "mongoose";
import DB_NAME from "../constants.js"

const connectDatabase = async () => {
    try {
        const connectionInstance = Mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log('Connection Instance : ', connectionInstance)
        console.log('Database connection is successfull')
    } catch (error) {
        console.log('Database connection failed', error)
    }
}

export { connectDatabase }