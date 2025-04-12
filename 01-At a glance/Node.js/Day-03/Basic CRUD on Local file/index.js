const express = require('express')
const fs = require('fs')
let users = require('./database/user_data.json')

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

app.patch('/api/users', (req, res) => {
    const userPayload = req.body

    if (!userPayload.email) {
        return res.status(400).json({
            status: false,
            msg: "email is required to update the user details"
        })
    }

    const editedUser = users.find((user) => {
        if (user.email === userPayload.email) {
            userPayload.first_name ? (user.first_name = userPayload.first_name) : user.first_name;
            userPayload.last_name ? (user.last_name = userPayload.last_name) : user.last_name;
            userPayload.gender ? (user.gender = userPayload.gender) : user.gender;
            userPayload.job_title ? (user.job_title = userPayload.job_title) : user.job_title;
            return user
        }
    })

    fs.writeFile('./database/user_data.json', JSON.stringify(users), (err, data) => {
        if (err) {
            console.log("Error while updating file in patch request :: ", err)
        } else {
            res.status(200).json({
                status: true,
                msg: "user updated successfully",
                updatedUser: editedUser
            })
        }
    })

})

app.delete('/api/users', (req, res) => {
    const userPayload = req.body

    if (!userPayload.email) {
        return res.status(400).json({
            status: false,
            msg: "email is required to delete the account"
        })
    }

    users = users.filter((user) => {
        return user.email !== userPayload.email
    })

    fs.writeFile('./database/user_data.json', JSON.stringify(users), (err) => {
        if (err) {
            console.log("Error while updating the file after deletion :: ", err)
        } else {
            return res.status(200).json({
                status: true,
                msg: "user deleted successfully"
            })
        }
    })

})

app.listen(PORT, () => {
    return console.log(`Server is running on http://localhost:${PORT}`)
})