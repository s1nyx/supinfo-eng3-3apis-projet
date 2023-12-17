const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'user', 'employee'],
        default: 'user'
    },
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)