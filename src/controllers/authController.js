const User = require('../models/user')

exports.signup = async (request, response) => {
    try {
        const { email, username, password } = request.body

        const user = new User({ email, username, role: 'user' })

        if (!user) {
            return response.status(400).json({ error: "User couldn't be created" })
        }

        await User.register(user, password)

        response.status(201).json({ message: "You just sign up with success !" })
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: "Internal server error" })
    }
}

exports.signin = async (request, response) => {
    response.status(200).json({ message: "Logged in with success !" })
}

exports.signout = async (request, response) => {
    request.logout((error) => {
        if (error) {
            return next(error)
        }

        response.status(200).json({ message: "Disconnected successfully !" })
    })
}