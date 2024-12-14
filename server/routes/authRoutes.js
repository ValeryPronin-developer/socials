const { Router } = require('express')
const authController = require('../controllers/authController')

const userRoutes = new Router()

userRoutes.post('/register', authController.register)
userRoutes.post('/login', authController.login)

module.exports = userRoutes