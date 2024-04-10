const express = require('express')

const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const PORT = 4043

const userRouter = express.Router()
app.use('/auth', userRouter)

userRouter
    .route('/signup')
    .get(getUser)
    .post(postSignup)

function getUser(req, res) {
    res.sendFile('./pages/index.html', { root: __dirname })
}

function postSignup(req, res) {
    console.log(req.body)
    let data = req.body
    res.json({
        "message": "form data send successfully",
        "data": data
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost${PORT}`)
})