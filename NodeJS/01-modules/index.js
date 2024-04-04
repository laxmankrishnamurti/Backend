import { error } from "console";
import { add, sub } from "./utils.js";
import fs from "fs"

console.log("Introduction to Node.js")
console.log('p1 :', performance.now())
// const readFile = fs.readFileSync('./index.html', "utf-8")
// console.log(readFile)

fs.readFile('./index.html', "utf-8", (error, data) => {
    // console.log(data)
    // console.log(error)
    if (data) {
        console.log("data :", data)
    } else {
        console.log('Error :', error)
    }
})

console.log(add(10, 20))
console.log(sub(30, 21))
console.log('p-2 :', performance.now())