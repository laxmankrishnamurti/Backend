const express = require('express')
const {handleGenerateNewShortID, handleURL, handleURLAnalytics, handleInputForm, handleSuccess} = require('../controllers/url.controller')

const router = express.Router()

router
.route('/')
.get(handleInputForm)
.post(handleGenerateNewShortID)

router
.route('/success')
.get(handleSuccess)

router
.route('/:id')
.get(handleURL)


router
.route('/analytics/:id')
.get(handleURLAnalytics)

module.exports = router