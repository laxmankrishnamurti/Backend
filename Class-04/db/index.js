import mongoose from "mongoose"
import { DB_NAME } from "../src/constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
        console.log('MongoDB connection is successfull !!!');
        console.log(connectionInstance);
    } catch (error) {
        console.log('MongoDB connection error :', error);
        process.exit(1);
    }
}

export default connectDB