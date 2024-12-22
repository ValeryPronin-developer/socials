const CommentModel = require('../models/commentModel')

class CommentsController {
    async getComments(req, res) {
        try {
            const {postId} = req.params
            const comments = await CommentModel.find({postId}).populate('author')
            res.status(200).json(comments)
        } catch (e) {
            res.status(500).json({message: 'Ошибка при получении комментариев'})
        }
    }

    async addComment(req, res) {
        try {
            const {content, author, login, postId} = req.body

            if (!content) {
                return res.status(400).json({message: 'Пустое поле'})
            }

            const comment = new CommentModel({content, author, login, postId})
            await comment.save()
            res.status(201).json({message: 'Комментарий добавлен', comment})
        } catch (e) {
            res.status(500).json({message: 'Ошибка при добавлении комментария'})
        }
    }

    async updateComment(req, res) {
        try {
            const {id, content} = req.body

            const updatedComment = await CommentModel.findByIdAndUpdate(id, {content}, {new: true})
            if (!updatedComment) {
                return res.status(404).json({message: 'Комментарий не найден'})
            }

            res.status(200).json({message: 'Комментарий обновлен', updatedComment})
        } catch (e) {
            res.status(500).json({message: 'Ошибка при обновлении комментария'})
        }
    }

    async deleteComment(req, res) {
        try {
            const {id} = req.body

            const deletedComment = await CommentModel.findByIdAndDelete(id)
            if (!deletedComment) {
                return res.status(404).json({message: 'Комментарий не найден'})
            }

            res.status(200).json({message: 'Комментарий удален'})
        } catch (e) {
            res.status(500).json({message: 'Ошибка при удалении комментария'})
        }
    }
}

module.exports = new CommentsController()