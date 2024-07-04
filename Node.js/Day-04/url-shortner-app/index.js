const express = require('express')
const connect = require('./src/db/connect')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Configuration for data collections

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Establishing databse connection
connect()

//Importing routes 
const urlRouter = require('./src/routes/url.routes')

//Configuring routes by handlers
app.use('/url', urlRouter)

app.listen(PORT, (err) => {
    if(err){
        console.error("Error while listening on PORT" + PORT)
    }else {
        console.log(`Server is listening on http://localhost:${PORT}`)
    }
})