const URL = require('../models/urlShortner.model')

async function handleTotalURL(req, res){
    const totalURL = await URL.find({})
    return res.render("home", {urls : totalURL})
}

module.exports = handleTotalURL