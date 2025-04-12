const fs = require('fs')

const fileResult = fs.readFileSync('./files/hello.html', 'utf-8')
console.log("File result is (Synchronous) : ", fileResult)

fs.readFile("./files/hello.txt", 'utf-8', (error, result) => {
    if (error) {
        console.log("Error while reading file : ", error)
    } else {
        console.log("File result : ", result)
    }
})