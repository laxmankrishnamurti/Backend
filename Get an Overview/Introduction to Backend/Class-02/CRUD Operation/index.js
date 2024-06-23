import express from "express"

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const PORT = 5000

let user = {}

app.get('/', (req, res) => {
    res.send(user)
})

app.post('/', (req, res) => {
    const data = req.body
    for (let key in data) {
        user[key] = data[key]
    }
    res.send(user)
})

app.patch('/', (req, res) => {
    const updateData = req.body
    for (let key in updateData) {
        user[key] = updateData[key]
    }
    res.send('Data sent successfully')
})

app.delete('/', (req, res) => {
    user = {}
    res.send(user)
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})