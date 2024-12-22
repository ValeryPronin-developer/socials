const PostsModel = require('../models/postsModel')
const UserModel = require('../models/userModel')

class postsController {
    async getPosts(req, res) {
        try {
            const posts = await PostsModel.find({}, 'title author createdAt login visibility');
            res.status(200).json({ posts });
        } catch (e) {
            console.error('Ошибка при получении постов:', e);
            res.status(400).json({ message: 'Произошла ошибка при получении' });
        }
    }

    async addPost(req, res) {
        try {
            const { title, author, login, visibility } = req.body;

            if (!title || !author || !login) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте текст, имя автора и логин' });
            }

            if (visibility === 'friends') {
                const currentUser = await UserModel.findOne({ email: login });
                if (!currentUser) {
                    return res.status(404).json({ message: 'Пользователь не найден' });
                }

                const postModel = new PostsModel({ title, author, login, visibility });
                await postModel.save();

                return res.status(200).json({ message: 'Пост добавлен только для друзей' });
            }

            const postModel = new PostsModel({ title, author, login });
            await postModel.save();

            return res.status(200).json({ message: 'Пост добавлен' });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Произошла ошибка при добавлении' });
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