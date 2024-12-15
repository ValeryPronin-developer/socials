const { Router } = require('express')
const UserController = require('../controllers/userController')
const router = Router()

router.get('/', UserController.getAllUsers)

module.exports = router