const express = require('express')

const app = express()
const PORT = 4044

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const homeRoute = express.Router()
const userRoute = express.Router()

app.use('/', homeRoute)
app.use('/user', userRoute)

homeRoute
    .route('/')
    .get(getHomePage)

homeRoute
    .route('/login')
    .get(getLoginPage)
    .post(getPassword)

userRoute
    .route('/course')
    .get(middle, getCourse)

function getHomePage(req, res) {
    res.sendFile('./pages/index.html', {
        root: __dirname
    })
}

function getLoginPage(req, res) {
    res.sendFile('./pages/login.html', {
        root: __dirname
    })
}

function getPassword(req, res) {
    let data = req.body
}

function getCourse(req, res) {
    res.sendFile('./pages/course.html', {
        root: __dirname
    })
}

function middle(req, res, next) {
    console.log('middleware one is successfully executed')
    res.redirect('/login')
    // next()
}

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})