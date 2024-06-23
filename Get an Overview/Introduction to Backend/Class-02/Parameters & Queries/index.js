const express = require('express')

const app = express()
app.use(express.urlencoded({
    extended: true
}))

const PORT = 4041

app.get('/', (req, res) => {
    res.send('Server is running on localhost')
})

app.post('/user/:userId', (req, res) => {
    console.log(req.params)
    res.send('Parameters received successfully')
})

app.post('/product/?', (req, res) => {
    console.log(req.query)
    res.send('Query sent successfully')
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})