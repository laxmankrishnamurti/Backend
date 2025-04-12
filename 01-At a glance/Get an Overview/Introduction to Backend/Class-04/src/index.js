import dotenv from "dotenv"
import connectDatabase from "./db/connectDatabase.js"
import { app } from "./app.js"

dotenv.config({
    path: "../.env"
})

const serverPort = process.env.PORT

connectDatabase()
    .then(() => {
        app.on("error", () => {
            console.log('Error while app on')
            throw error;
        })

        app.get('/', (req, res) => {
            res.send(`Server is running on http://localhost:${serverPort}`)
        })

        app.listen(serverPort, () => {
            console.log(`Server is running on http://localhost:${serverPort}`)
        })
    })
    .catch((error) => {
        console.log('mongoDB connection failed!!!', error)
    })