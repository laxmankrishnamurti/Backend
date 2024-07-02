const express = require('express')
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, deleteById} = require('../controllers/users.controllers')

const router = express.Router()

router
.route('/')
.get(getAllUsers)
.post(createUser)
.patch(updateUser)
.delete(deleteUser)

router
.route('/:_id')
.get(getUserById)
.delete(deleteById)
//Todo :: .delete(deleteUser)

module.exports = router