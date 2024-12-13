const { Schema, model} = require('mongoose')

const PostsSchema = new Schema({
    title: {type:String, required:true},
})

module.exports = model('Posts', PostsSchema)