const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    las_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model("users", userSchema)

module.exports = User