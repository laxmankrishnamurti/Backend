import { app } from "./app.js"
import connectDatabase from "./db/connectDatabase.js"
import dotenv from "dotenv"

dotenv.config({
    path: "../.env"
})

const serverPORT = process.env.PORT

connectDatabase()
    .then(() => {
        // app.on("error", () => {
        //     console.log('Error while app on', error)
        // })

        app.get('/', (req, res) => {
            res.send(`server is runnin on localhost on PORT : ${serverPORT}`)
        })

        app.listen(serverPORT, () => {
            console.log(`Server is running on http://localhost:${serverPORT}`)
        })
    })
    .catch((error) => {
        console.log('Database connection failed', error)
    })