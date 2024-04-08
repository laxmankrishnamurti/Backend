const http = require('http');
const fs = require('fs')

const PORT = 3000;

const server = http.createServer((req, res) => {
    let path = './pages'

    switch (req.url) {
        case '/':
            path += '/index.html'
            break;

        case '/about':
            path += '/about.html'
            break;

        case '/contact':
            path += '/contact.html'
            break;

        default:
            path += '/notFound.html'
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