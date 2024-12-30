const {Router} = require('express')
const UserController = require('../controllers/userController')
const router = Router()

router.get('/', UserController.getAllUsers)
router.get('/:email/friends', UserController.getFriends)
router.post('/add-friend', UserController.addFriend)
router.post('/send-request', UserController.sendRequest)
router.post('/accept-request', UserController.acceptRequest)
router.post('/reject-request', UserController.rejectRequest)
router.post('/cancel-request', UserController.cancelRequest)
router.post('/remove-friend', UserController.removeFriend)
router.get('/:email', UserController.getUser)

module.exports = router