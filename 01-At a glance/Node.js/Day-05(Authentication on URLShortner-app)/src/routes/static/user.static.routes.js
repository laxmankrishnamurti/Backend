const express = require('express')
const URL = require('../../models/urlShortner.model')

const router = express.Router()

router
.route('')
.get(async (req, res) => {
    const totalURL = await URL.find({})
    return res.render("home", {urls : totalURL})
})
 
router
.route('/user')
.get((req, res) => {
    res.render("userRegistration")
})

router
.route('/login')
.get((req, res) => {
    res.render("login")
})

module.exports = router