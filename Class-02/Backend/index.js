import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Server is listening.......')
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: '1',
            title: 'First joke',
            description: 'This is the first joke'
        },
        {
            id: '2',
            title: 'Second joke',
            description: 'This is the second joke'
        },
        {
            id: '3',
            title: 'Third joke',
            description: 'This is the third joke'
        }
    ]

    res.send(jokes);
})

app.listen(port, () => {
    console.log(`Jokes server listening on port http://localhost:${port}`);
})