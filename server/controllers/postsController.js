const PostsModel = require('../models/postsModel')

class postsController {
    async getPosts(req, res) {
        try {
            const result = await PostsModel.find({}, "title")
            res.status(200).json({posts: result})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async addPost(req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({message: 'Пожалуйста, добавьте текст'})
            }

            const postModel = new PostsModel({title: req.body.title})

            await postModel.save()

            return res.status(200).json({message: 'Элемент успешно добавлен'})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при добавлении'})
        }
    }

    async deletePost(req, res) {
        try {
            const {deletedCount} = await PostsModel.deleteOne({_id: req.body.id})

            if (!deletedCount) {
                res.status(400).json({message: 'Удаление не произошло, пожалуйста, проверьте заголовок'})
            }

            return res.status(200).json({message: "Элемент был успешно удален"})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при удалении'})
        }
    }

    async updatePost(req, res) {
        try {
            const {id, newTitle} = req.body

            if (!id || !newTitle) {
                return res.status(400).json({message: 'Пожалуйста, укажите ID и новый заголовок'})
            }

            const result = await PostsModel.findByIdAndUpdate(
                id,
                {title: newTitle},
                {new: true}
            )

            if (!result) {
                return res.status(404).json({message: 'Задача с указанным ID не найдена'})
            }

            return res.status(200).json({message: 'Элемент успешно обновлен', post: result})
        } catch (e) {
            res.status(500).json({message: 'Произошла ошибка при обновлении'})
        }
    }

}

module.exports = new postsController()