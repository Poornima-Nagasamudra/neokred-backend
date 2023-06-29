const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userCtrl')
const authenticateUser = require('../app/middlewares/authenticateUser')

//Register
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/user/account', authenticateUser, userController.account)

module.exports = router