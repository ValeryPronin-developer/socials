const {Router} = require('express')
const postsController = require('../controllers/postsController')

const postsRoutes = new Router()

postsRoutes.get('/list', postsController.getPosts)
postsRoutes.post('/add', postsController.addPost)
postsRoutes.delete('/delete', postsController.deletePost)
postsRoutes.put('/update', postsController.updatePost)

module.exports = postsRoutes