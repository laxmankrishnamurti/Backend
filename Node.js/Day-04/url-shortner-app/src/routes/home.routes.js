const express = require('express')
const handleTotalURL = require('../controllers/home.controller')

const router = express.Router()

router
.route('/')
.get(handleTotalURL)


module.exports = router