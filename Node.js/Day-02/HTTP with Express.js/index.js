const express = require('express')

const app = express()

const PORT = 3001

app.get('/', (req, res) => {
    res.send("<h1 >Hello</h1>" + `<h1>${req.query.username}</h1>`)
})

app.listen(PORT, () => {
    console.log(`Express server is listening on http://localhost:${PORT}`)
})