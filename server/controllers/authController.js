const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
    async register(req, res) {
        try {
            const {name, email, password} = req.body

            const existingUser = await UserModel.findOne({email})
            if (existingUser) {
                return res.status(400).json({message: 'Такой пользователь уже зарегистрирован'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const isAdmin = email === 'admin@admin.a'

            const user = new UserModel({
                name,
                email,
                password: hashedPassword,
                isAdmin,
            })

            await user.save()

            res.status(201).json({message: 'Пользователь успешно зарегистрирован'})
        } catch (e) {
            res.status(500).json({message: 'Ошибка при регистрации'})
        }
    }

    async login(req, res) {
        try {
            const {email, password, friends} = req.body
            const user = await UserModel.findOne({email})

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                {id: user._id, isAdmin: user.isAdmin},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )

            res.status(200).json({token, name: user.name, isAdmin: user.isAdmin, email, friends: user.friends, receivedRequests: user.receivedRequests, sentRequests: user.sentRequests})
        } catch (e) {
            res.status(500).json({message: 'Ошибка при авторизации'})
        }
    }
}

module.exports = new AuthController()