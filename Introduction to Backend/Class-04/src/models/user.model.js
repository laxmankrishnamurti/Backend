import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)

export default User