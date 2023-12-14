const joi = require('joi')

const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().required().valid('admin', 'user')
})

const updateUserSchema = joi.object({
    username: joi.string(),
    email: joi.string().email(),
    password: joi.string(),
    role: joi.string().valid('admin', 'user')
}).min(1)

const userIdSchema = joi.object({
    id: joi.string().required()
})

module.exports = { userSchema, userIdSchema, updateUserSchema }