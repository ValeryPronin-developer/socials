const UserModel = require('../models/userModel')

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find({}, 'name')
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при получении пользователей' })
        }
    }
}

module.exports = new UserController()