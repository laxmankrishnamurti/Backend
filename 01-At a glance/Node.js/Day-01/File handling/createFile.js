const fs = require("fs")

const username = "laxmankrishnamurti"

fs.writeFileSync('./files/demo.txt', username)
fs.writeFile('./files/demo.html', '<html><body><h1>This is demo.html file</h1></body></html>', (error) => {
    if (error) {
        console.log("Error while creating demo.html : ", error)
    } else {
        console.log("demo.html file has been created successfully ")
    }
})
