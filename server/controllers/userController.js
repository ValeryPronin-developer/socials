const UserModel = require('../models/userModel')

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find({}, 'name email friends')
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при получении пользователей' })
        }
    }

    async getFriends(req, res) {
        try {
            const { email } = req.params
            const user = await UserModel.findOne({ email }, 'friends')

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' })
            }

            const friends = await UserModel.find(
                { email: { $in: user.friends } },
                'name email'
            )

            res.status(200).json(friends)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при получении списка друзей' })
        }
    }

    async getUser(req, res) {
        try {
            const { email } = req.params
            const user = await UserModel.findOne({ email }, 'name email friends')

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' })
            }

            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при получении пользователя' })
        }
    }

    async addFriend(req, res) {
        try {
            const { currentEmail, friendEmail } = req.body

            const currentUser = await UserModel.findOne({ email: currentEmail })
            const friendUser = await UserModel.findOne({ email: friendEmail })

            if (!currentUser || !friendUser) {
                return res.status(404).json({ message: 'Один или оба пользователя не найдены' })
            }

            if (currentUser.friends.includes(friendEmail)) {
                return res.status(400).json({ message: 'Этот пользователь уже в друзьях' })
            }

            currentUser.friends.push(friendEmail)
            friendUser.friends.push(currentEmail)

            await currentUser.save()
            await friendUser.save()

            res.status(200).json({ message: 'Пользователь добавлен в друзья' })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при добавлении в друзья' })
        }
    }

    async removeFriend(req, res) {
        try {
            const { currentEmail, friendEmail } = req.body

            const currentUser = await UserModel.findOne({ email: currentEmail })
            const friendUser = await UserModel.findOne({ email: friendEmail })

            if (!currentUser || !friendUser) {
                return res.status(404).json({ message: 'Один или оба пользователя не найдены' })
            }

            currentUser.friends = currentUser.friends.filter(email => email !== friendEmail)
            friendUser.friends = friendUser.friends.filter(email => email !== currentEmail)

            await currentUser.save()
            await friendUser.save()

            res.status(200).json({ message: 'Пользователь удалён из друзей' })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при удалении из друзей' })
        }
    }
}

module.exports = new UserController()