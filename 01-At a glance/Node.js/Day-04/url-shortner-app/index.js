const express = require('express')
const connect = require('./src/db/connect')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Configuration for data collections

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Establishing databse connection
connect()

//Configuring views file for server-side-rendering
app.set("view engine", "ejs")
app.set("views", path.resolve("./src/views"))

//Importing routes 
const homeRouter = require('./src/routes/home.routes')
const urlRouter = require('./src/routes/url.routes')

//Configuring routes with handlers
app.use('/', homeRouter)
app.use('/url', urlRouter)


app.listen(PORT, (err) => {
    if(err){
        console.error("Error while listening on PORT" + PORT)
    }else {
        console.log(`Server is listening on http://localhost:${PORT}`)
    }
})