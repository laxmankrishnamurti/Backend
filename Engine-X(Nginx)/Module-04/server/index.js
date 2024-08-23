const express = require('express')
const app = express()

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        port: PORT,
        instance: 1
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT} URI : http://localhost:${PORT}`)
})