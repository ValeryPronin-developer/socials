const {Schema, model} = require('mongoose')

const CommentSchema = new Schema({
    content: {type: String, required: true},
    author: {type: String, required: true},
    login: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, ref: 'Posts', required: true},
}, {timestamps: true})

module.exports = model('Comment', CommentSchema)