import http from "http"
import fs from "fs"

const PORT = 3000;

const readData = fs.readFileSync('./index.html', "utf-8")
const userData = JSON.parse(fs.readFileSync('./userData.json', "utf-8"))
const getUser = userData.users[0]
const allUsersData = userData.users;

const server = http.createServer((req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`)

    const url = req.url

    if (url === '/') {
        res.setHeader('content-type', 'text/html')
        res.end('Hello')
    } else if (url === '/home') {
        const modifiedData = readData
            .replace('**userimage**', getUser.image)
            .replace('**username**', getUser.firstName)
            .replace('**userage**', getUser.age)
            .replace('**userocc**', getUser.company.title)
            .replace('**useraddr**', getUser.address.address)
        res.end(modifiedData)
    } else if (req.url.startsWith('/products')) {
        const userId = req.url.split('/')[2]
        const user = allUsersData.find((check) => {
            if (check.id === (+userId)) {
                return check
            }
        })
        res.setHeader('content-type', 'text/html')
        const id = req.url.split('/')
        for (let i = 0; i < id.length; i++) {
            console.log(id[i])
            if (id[i] > 0) {
                console.log(id[i])
            }
        }
        const modifiedData = readData
            .replace('**userimage**', user.image)
            .replace('**username**', user.firstName)
            .replace('**userage**', user.age)
            .replace('**userocc**', user.company.title)
            .replace('**useraddr**', user.address.address)
        res.end(modifiedData)
        return;
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