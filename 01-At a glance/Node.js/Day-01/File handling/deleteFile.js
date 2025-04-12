const fs = require('fs')

fs.unlink('./files/demo.txt', (error) => {
    if (error) {
        console.log("Error while deleting the demo.txt file :", error)
    } else {
        console.log("The file has been deleted successfully")
    }
})