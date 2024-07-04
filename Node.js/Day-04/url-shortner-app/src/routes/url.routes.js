const express = require('express')
const {handleGenerateNewShortID, handleURL, handleURLAnalytics} = require('../controllers/url.controller')

const router = express.Router()

router
.route('/')
.post(handleGenerateNewShortID)


router
.route('/:id')
.get(handleURL)


router
.route('/analytics/:id')
.get(handleURLAnalytics)

module.exports = router