const URL = require('../models/urlShortner.model')
const generateNerShortID = require('../utils/generateNewShortID')

function handleInputForm(req, res){
    res.render("generateShortID")
}

function handleSuccess(req, res){
    res.render("success")
}

function handleURLAnalytics(req, res){
    res.render("analytics")
}


async function handleGenerateNewShortID(req, res){

    const url = req.body.url;

    if(!url){
        return res.status(400).json({
            status: false,
            msg: "url is required"
        })
    }

    const generatedID = generateNerShortID(8)

    const result = await URL.create({
        shortID: generatedID,
        redirectURL: url,
        visitHistory: []
    })

    if(result){
        res.status(201).render("generateShortID", {id: result.shortID})
    }else {
        res.status(500).json({
            status: false,
            msg: "Internal server error! Something went wrong while creating a shortID for the URL."
        })
    }

}


async function handleURL(req, res){
    const url = req.params.id

    if(!url){
        return res.status(400).json({
            status: false,
            msg: "url id is required"
        })
    }

    const result = await URL.findOneAndUpdate({shortID: url}, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    if(result){
        return res.redirect(result.redirectURL)
    }else{
        return res.status(400).json({
            status: false,
            msg: "ID dosen't exist!!!"
        })
    }

}


async function handleURLAnalytics(req, res){
    const id = req.params.id

    if(!id){
        return res.status(400).json({
            status: false,
            msg: "shortID is required to check analytics"
        })
    }

    const result = await URL.findOne({shortID: id})
    

    if(result){
        return res.status(200).render("analytics", {
            totalClicks: result.visitHistory.length,
            visitHistory: result.visitHistory
        })
    }else {
        return res.status(400).json({
            status: false,
            msg: "The shortID dosen't exist!!!"
        })
    }

}


module.exports = {handleGenerateNewShortID, handleURL, handleURLAnalytics, handleInputForm, handleSuccess}