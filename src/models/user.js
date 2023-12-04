const mongoose = require("mongoose")

exports.userSchema = mongoose.Schema({
    username: {type: String, required: 1, unique: 1},
    email: {type: String, required: 1, unique: 1},
    password: {type: String, required: 1},
    role: {type: String, required: 1},
    iv: {type: String, required: 1}
})