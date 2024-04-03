import http from "http"
import fs from "fs"
import { json } from "express";

const PORT = 3000;

const readData = fs.readFileSync('./index.html', "utf-8")
const userData = fs.readFileSync('./userData.json', "utf-8")

const server = http.createServer((req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`)

    switch (req.url) {
        case '/home':
            res.setHeader('content-type', 'text/html')
            res.end(readData)
            break;

        case '/api/v1':
            res.setHeader('content-type', 'application/json')
            res.end(userData)
            break;

        default:
            res.setHeader('content-type', 'text/html')
            res.end('Hello world!!!!')
    }
})

server.listen(PORT)