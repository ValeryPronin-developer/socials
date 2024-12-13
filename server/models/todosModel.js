const { Schema, model} = require('mongoose')

const TodosSchema = new Schema({
    title: {type:String, required:true},
})

module.exports = model('Todos', TodosSchema)