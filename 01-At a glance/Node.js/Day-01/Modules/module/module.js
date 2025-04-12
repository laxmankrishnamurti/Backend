function generatePassword() {
    const string = "abcdefghijklmnopqrstuvwxyz0123456789"
    let password = '';
    for (let i = 0; i < 12; i++) {
        const randomNumber = Math.floor(Math.random() * (string.length));
        password += string.charAt(randomNumber)
    }
    return password
}

function getArray(value) {
    const stringArray = [...value]
    return stringArray
}

module.exports = { generatePassword, getArray }