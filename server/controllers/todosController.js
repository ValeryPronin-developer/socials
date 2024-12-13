const TodosModel = require('../models/todosModel')

class todosController {
    async getTodos(req, res) {
        try {
            const result = await TodosModel.find({}, "title")
            res.status(200).json({todos: result})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async addTodo(req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({message: 'Пожалуйста, добавьте заголовок'})
            }

            const todoModel = new TodosModel({title: req.body.title})

            await todoModel.save()

            return res.status(200).json({message: 'Элемент успешно добавлен'})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при добавлении'})
        }
    }

    async deleteTodo(req, res) {
        try {
            const {deletedCount} = await TodosModel.deleteOne({_id: req.body.id})

            if (!deletedCount) {
                res.status(400).json({message: 'Удаление не произошло, пожалуйста, проверьте заголовок'})
            }

            return res.status(200).json({message: "Элемент был успешно удален"})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при удалении'})
        }
    }

    async updateTodo(req, res) {
        try {
            const {id, newTitle} = req.body

            if (!id || !newTitle) {
                return res.status(400).json({message: 'Пожалуйста, укажите ID и новый заголовок'})
            }

            const result = await TodosModel.findByIdAndUpdate(
                id,
                {title: newTitle},
                {new: true}
            )

            if (!result) {
                return res.status(404).json({message: 'Задача с указанным ID не найдена'})
            }

            return res.status(200).json({message: 'Элемент успешно обновлен', todo: result})
        } catch (e) {
            res.status(500).json({message: 'Произошла ошибка при обновлении'})
        }
    }

}

module.exports = new todosController()