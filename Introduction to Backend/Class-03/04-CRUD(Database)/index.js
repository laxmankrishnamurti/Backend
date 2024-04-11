const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

DATABASE_URI = 'mongodb+srv://laxmankrishnamurti:CHETANAchetana&&00@cluster0.f3hzy5j.mongodb.net'

mongoose.connect(DATABASE_URI)
    .then((res) => {
        console.log('Database connection successfully')
    })
    .catch((err) => {
        console.log('Database connection failed', err)
    })

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)

async function createUser(createUsers) {
    let userInstance = await User.create(createUsers)
    console.log(userInstance)
}

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
    await createUser(user)
    res.json({
        "message": "Data send successfully",
        "userData": user
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})

