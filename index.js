require('dotenv').config()  //For using dotenv

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/login', (req, res) => {
    res.send('<h1>Please Login </h1>')
})

app.listen(process.env.port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})