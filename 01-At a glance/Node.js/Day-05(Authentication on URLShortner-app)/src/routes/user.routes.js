const express = require("express")
const {handleUserRegistration, handleUserLogin} = require('../controllers/user.controller')

const router = express.Router()

router
.route('/')
.post(handleUserRegistration)


router
.route('/login')
.post(handleUserLogin)


module.exports = router