const express = require('express')
const connect = require('./src/db/connect')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))

connect()

//Router import
const userRouter = require('./src/routes/user.routes')

//Setting routes
app.use('/api/v1/users', userRouter)


app.listen(PORT, (err) => {
    if(err){
        console.error("Error while listening on PORT" + PORT)
    }else {
        console.log(`Server is listening on http://localhost:${PORT}`)
    }
})