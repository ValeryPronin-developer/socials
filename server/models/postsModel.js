const { Schema, model} = require('mongoose')

const PostsSchema = new Schema({
    title: {type:String, required:true},
    author: { type: String, required: true },
    login: { type: String, required: true },
}, { timestamps: true })

module.exports = model('Posts', PostsSchema)