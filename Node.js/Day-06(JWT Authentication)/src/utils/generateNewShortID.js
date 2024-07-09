function generateNerShortID(n){
    let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    let generatedID = ""
    for(let i = 0; i < n; i++){
        let randomNumber = Math.floor(Math.random() * (string.length))
        generatedID += string.charAt(randomNumber)
    }

    return generatedID;

}

module.exports = generateNerShortID