const express = require('express')

const app = express()
const PORT = 8080

app.get('/', (req, res) => {
    res.sendFile('./pages/index.html', { root: __dirname })
})


app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})