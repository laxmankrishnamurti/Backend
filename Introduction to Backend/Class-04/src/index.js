import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./db/connectDatabase"

dotenv.config({
    path: "../.env"
})

connectDatabase()
    .then(() => {

    })