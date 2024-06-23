const http = require('http');
const fs = require('fs')

const PORT = 3000;

const server = http.createServer((req, res) => {
    let path = './pages'

    switch (req.url) {
        case '/':
            path += '/index.html'
            res.statusCode = 200
            break;

        case '/about':
            path += '/about.html'
            res.statusCode = 200
            break;

        //Redirection page 

        case '/about-me':
            res.statusCode = 301
            res.setHeader('location', '/about')
            res.end()
            break;

        case '/contact':
            path += '/contact.html'
            res.statusCode = 200
            break;

        case '/confirm':
            path += '/confirmation.html'
            res.statusCode = 200
            break;

        default:
            path += '/notFound.html'
            res.statusCode = 404
            break;
    }

    fs.readFile(path, 'utf-8', (err, textData) => {
        if (err) {
            console.log('Error while reading file', err)
        } else {
            res.setHeader('Content-Type', 'text/html')
            res.write(textData)
            res.end()
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})