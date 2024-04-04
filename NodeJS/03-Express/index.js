import express from 'express'

const PORT = 5050;
const server = express()

server.use(express.urlencoded({
    extended: true
}))

server.post('/', (req, res) => {

    const formData = req.body
    console.log(formData)

    res.setHeader('content-type', 'text/html')
    res.send('Congratulation!!! Your form is submitted successfully.')
})

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})