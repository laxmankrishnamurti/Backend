import { app } from "./app.js";
import callDB from "./db/dbConnect.js";
import dotenv from "dotenv"

dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT

callDB()
    .then(() => {
        app.on("error", () => {
            console.error('from index.js while starting the app', error)
        })

        app.get("/", (req, res) => {
            res.send(`Server is running on localhost, port number : ${PORT}`)
        })

        app.listen(PORT, (req, res) => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Calling failed', error)
    }) 
