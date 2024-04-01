import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const callDB = async () => {
    try {
        const callingInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log('DATABASE calling is successfully executed')
        console.log('CallingInstance:', callingInstance)
    } catch (error) {
        console.error('Unable to call DB!!!')
    }
}

export default callDB