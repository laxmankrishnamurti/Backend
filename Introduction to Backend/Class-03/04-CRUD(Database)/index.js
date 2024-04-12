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
const fetchRouter = express.Router()
app.use('/', userRouter)
app.use('/user', fetchRouter)

let user = {}

userRouter
    .route('/')
    .get(getFormPage)
    .post(collectFormData)

fetchRouter
    .route('/')
    .get(fetchUser)
    .post(findOneUser)
    .patch(updateUser)
    .delete(deleteUser)

function getFormPage(res, res) {
    res.sendFile('./pages/index.html', {
        root: __dirname
    })
}

async function fetchUser(req, res) {
    let fetchedUser = await User.find()
    res.json({
        "message": "User fetched successfully from database",
        "User's list": fetchedUser
    })
}

async function findOneUser(req, res) {
    let userToFind = req.body
    let userOne = await User.findOne({ username: `${userToFind.username}` })
    console.log(userOne)
    res.json({
        "message": "Selected user founded successfully",
        "user-details": userOne
    })
}

async function updateUser(req, res) {
    let userToUpdate = req.body
    await User.findOneAndUpdate({ username: 'Raunak' }, { username: `${userToUpdate.username}` })
    res.json({
        "message": "User updated successfully",
    })
}

async function deleteUser(req, res) {
    let userToDelete = req.body
    await User.findOneAndDelete({ username: `${userToDelete.username}` })
    res.json({
        "message": "user has been deleted successfully"
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

