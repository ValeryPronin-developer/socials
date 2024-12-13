const { Router } = require('express')
const todosController = require('../controllers/todosController')

const todosRoutes = new Router()

todosRoutes.get('/list', todosController.getTodos)
todosRoutes.post('/add', todosController.addTodo)
todosRoutes.delete('/delete', todosController.deleteTodo)
todosRoutes.put('/update', todosController.updateTodo)

module.exports = todosRoutes