const express = require("express")
const {handleUserRegistration} = require('../controllers/user.controller')

const router = express.Router()

router
.route('/')
.post(handleUserRegistration)

module.exports = router