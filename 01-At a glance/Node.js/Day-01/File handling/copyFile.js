const fs = require('fs')

fs.cp('./files/demo.html', 'files/demoHtmlCopy.html', (error) => {
    if (error) {
        console.log("Error while copying the demo.html file ", error)
    } else {
        console.log("File has been copied successfully")
    }
})