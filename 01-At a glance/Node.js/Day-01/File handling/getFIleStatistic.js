const fs = require('fs')

const result = fs.statSync('./files/demo.html', (error) => {
    if (error) {
        console.log("Error while getting the details about the demo.html file ", error)
    }
})
console.log("File details : ", result)