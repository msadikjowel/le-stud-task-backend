// mongoose, passport-local-mongoose
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

// creating user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now },
})

// hash password using passport local mongoose plugin
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)