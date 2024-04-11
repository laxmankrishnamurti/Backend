const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./user.model.js')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

DATABASE_URI = 'mongodb+srv://laxmankrishnamurti:CHETANAchetana&&00@cluster0.f3hzy5j.mongodb.net'
DB_NAME = 'user'

const connectDB = async () => {
    try {
        let connectionInstance = mongoose.connect(`${DATABASE_URI}/${DB_NAME}`)
        console.log('Database connection is successful')
        console.log(connectionInstance)
    } catch (error) {
        console.log('Database connection failed', error)
    }
}

connectDB()


const PORT = 4046

const userRouter = express.Router()
app.use('/', userRouter)

let user = {}

userRouter
    .route('/')
    .get(getFormPage)
    .post(collectFormData)

function getFormPage(res, res) {
    res.sendFile('./pages/index.html', {
        root: __dirname
    })
}

async function collectFormData(req, res) {
    const formData = req.body
    for (let key in formData) {
        user[key] = formData[key]
    }

    res.json({
        "message": "Data send successfully",
        "userData": user
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})
