const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {type: String, required: 1, unique: 1},
    password: {type: String, required: 1},
    iv: {type: String, required: 1}
})

const User = mongoose.Model("User", userSchema, "users")

exports.User = User