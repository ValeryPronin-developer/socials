const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const postsRoutes = require("./routes/postsRoutes")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require('./routes/userRoutes')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/posts', postsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('HelloWorld')
})

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()