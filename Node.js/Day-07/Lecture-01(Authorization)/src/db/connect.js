const mongoose = require('mongoose')

async function connect(){
    await mongoose.connect(`mongodb://127.0.0.1:27017/urlshortner`)
    .then(() => console.log("Databse connected successfully"))
    .catch((err) => console.log("Error while connecting mongodb database :: ", err))
}

module.exports = connect