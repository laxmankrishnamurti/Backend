//Importing methods/module from different location
// import { generatePassword, getArray } from './module/module.js'
const { generatePassword, getArray } = require('./module/module')


const myPassword = generatePassword()
const passwordArray = getArray(myPassword)

console.log("My password : ", passwordArray)

let username = "laxmankrishnamurti"
username = getArray(username)
console.log("Username is : ", username)