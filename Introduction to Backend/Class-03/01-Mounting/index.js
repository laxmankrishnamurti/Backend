const express = require('express')

const app = express()
const PORT = 4042

app.use(express.json())

let userData = {}


const userRouter = express.Router()
app.use('/user', userRouter)

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

function getUser(req, res) {
    res.json({
        "message": "user-details",
        "data": userData
    })
}

function postUser(req, res) {
    let data = req.body
    for (let key in data) {
        userData[key] = data[key]
    }
    res.json({
        "message": "Data received successfully",
        "data": data,
        "userDetails": userData
    })
}

function updateUser(req, res) {
    let updateData = req.body
    for (let key in updateData) {
        userData[key] = updateData[key]
    }
    res.json({
        "message": "user updated successfully",
        "updated User": userData
    })
}

function deleteUser(req, res) {
    userData = {}
    res.json({
        "message": "User deleted successfully",
        "user": userData
    })
}

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})