const http = require('http')
const fs = require('fs')

const PORT = 3000
const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return

    const requestedInfo = new Date()

    const hours = requestedInfo.getHours()
    const minutes = requestedInfo.getMinutes()
    const seconds = requestedInfo.getSeconds()

    const requestedTime = `${hours} ${minutes} ${seconds}`

    fs.appendFile('./serverLog.txt', `${requestedTime} ${requestedInfo.toDateString()
        } ${req.url} ${req.method} \n`, (err) => {
            if (err) {
                console.error("Error while updating serverLog file : ", err)
            } else {
                console.log("serverLog updated seccessfully")
            }
        })
    switch (req.url) {
        case '/':
            res.end("<h1>This is Home page</h1>")
            break;
        case '/about':
            res.end("<h1>This is about page</h1>")
            break;
        case '/login':
            res.end("<h1>This is login page</h1>")
            break;
        case '/signup':
            res.end("<h1>This is signup page</h1>")
            break;
        default:
            res.end("<h1>404 Page not found...</h1>")
            break;
    }
})

server.listen(PORT, () => {
    console.log(`server is listening on : http://localhost:${PORT}`)
})