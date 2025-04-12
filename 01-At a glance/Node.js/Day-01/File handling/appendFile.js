const fs = require('fs')

fs.appendFile('./files/demo.html', '<h2>Appended text</h2>', (error) => {
    if (error) {
        console.log("Error while appending into the demo.html file ", error)
    } else {
        console.log("File has been updated successfully")
    }
})