require('dotenv').config()

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send(`Server is listening on localhost, port number : ${process.env.PORT}`)
})

app.listen(process.env.PORT, () => {
    console.log(`Sever is listening on http://localhost:${process.env.PORT}`)
})