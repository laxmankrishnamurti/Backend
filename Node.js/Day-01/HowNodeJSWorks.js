const fs = require("fs")

setTimeout(() => {
    console.log("Timer-1")
}, 0);

setImmediate(() => {
    console.log("Immediate-1")
})

fs.readFile('sample.txt', 'utf-8', () => {
    console.log("I/O polling has been ended.")
    setTimeout(() => {
        console.log("Timer-2")
    }, 0);

    setTimeout(() => {
        console.log("Timer-3")
    }, 5 * 1000);

    setImmediate(() => {
        console.log("Immediate-2")
    })
})

console.log("Top level code is executed!!!")