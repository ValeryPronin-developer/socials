const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    friends: [{type: String}],
    sentRequests: [{type: String}],
    receivedRequests: [{type: String}]
})

module.exports = model('User', UserSchema)