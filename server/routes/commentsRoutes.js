const { Router } = require('express')
const commentsController = require('../controllers/commentController')

const commentsRoutes = new Router()

commentsRoutes.get('/:postId', commentsController.getComments)
commentsRoutes.post('/add', commentsController.addComment)
commentsRoutes.put('/update', commentsController.updateComment)
commentsRoutes.delete('/delete', commentsController.deleteComment)

module.exports = commentsRoutes