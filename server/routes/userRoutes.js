const { Router } = require('express')
const UserController = require('../controllers/userController')
const router = Router()

router.get('/', UserController.getAllUsers)
router.get('/:email/friends', UserController.getFriends)
router.post('/add-friend', UserController.addFriend)
router.post('/remove-friend', UserController.removeFriend)
router.get('/:email', UserController.getUser)

module.exports = router