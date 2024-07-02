const express = require('express')
const fs = require('fs')
const users = require('./database/user_data.json')

const app = express()

app.use(express.urlencoded({ extended: false }))

const PORT = 3007

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Hello from server</h1>")
})

// app.get('/users', (req, res) => {
//     const html = `
//         <ul>
//             ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//         </ul>
//     `
//     res.send(html)
// })

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    res.status(200).send(user)
})

app.post('/api/users', (req, res) => {
    const userData = req.body

    if (userData.email === users[users.length - 1].email) {
        return res.status(401).json({
            msg: "This email is already in used"
        })
    }

    users.push({ id: (users.length + 1), ...userData })
    console.log(users[users.length - 1])
    fs.writeFile('./database/user_data.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return console.log("Error while updating database file :: ", err)
        } else {
            return res.status(201).json({
                status: true,
                msg: "User created successfully",
                user_id: users.length
            })
        }
    })
})

app.listen(PORT, () => {
    return console.log(`Server is running on http://localhost:${PORT}`)
})