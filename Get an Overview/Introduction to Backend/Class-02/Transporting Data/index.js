// import express from "express"

// const app = express()

// const PORT = 4040

// app.get('/', (req, res) => {
//     res.sendFile('/home/laxmankrishnamurti/Desktop/Learning Backend/Backend/Introduction to Backend/Class-02/Transporting Data/pages/index.html')
// })

// app.listen(PORT, () => {
//     console.log(`Server is listening on http://localhost:${PORT}`)
// })

const express = require('express')

const app = express()
PORT = 4040

app.get('/', (req, res) => {
    res.sendFile('./pages/index.html', {
        root: __dirname
    })
})

app.get('/confirm', (req, res) => {
    res.sendFile('./pages/confirm.html', {
        root: __dirname
    })
})

app.get('/about-us', (req, res) => {
    res.redirect('/')
})

app.use((req, res) => {
    res.send('Oops!!! The page you are looking for is not found')
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})