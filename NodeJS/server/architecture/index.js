import http from "http"
import fs, { read } from "fs"
import { json } from "express";

const PORT = 3000;

const readData = fs.readFileSync('./index.html', "utf-8")
const userData = JSON.parse(fs.readFileSync('./userData.json', "utf-8"))
const getUser = userData.users[0]

const server = http.createServer((req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`)

    const url = req.url

    if (url === '/') {
        res.setHeader('content-type', 'text/html')
        res.end('Hello')
    }

    if (url === '/home') {
        const modifiedData = readData
            .replace('**userimage**', getUser.image)
            .replace('**username**', getUser.firstName)
            .replace('**userage**', getUser.age)
            .replace('**userocc**', getUser.company.title)
            .replace('**useraddr**', getUser.address.address)
        res.end(modifiedData)
    }

    // switch (req.url) {
    //     case '/home':
    //         res.setHeader('content-type', 'text/html')
    //         res.end(readData)
    //         break;

    //     case '/api/v1':
    //         res.setHeader('content-type', 'application/json')
    //         res.end(userData)
    //         break;

    //     default:
    //         res.setHeader('content-type', 'text/html')
    //         res.end('Hello world!!!!')
    // }
})

server.listen(PORT)