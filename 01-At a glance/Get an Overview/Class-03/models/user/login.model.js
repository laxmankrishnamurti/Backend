// Shows how to set Relation between data 

import mongoose, { mongo } from "mongoose";

const Userlogin = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Type.ObjectID,
        ref: "User"     //Form where we want to fetch the username
    },
    password: {
        type: mongoose.Schema.Type.ObjectID,
        ref: "User"
    }
}, { timestamps: true })

export const Login = mongoose.model("Login", Userlogin)