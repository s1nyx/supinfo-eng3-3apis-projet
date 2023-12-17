const User = require('../models/user')

exports.signup = async (request, response) => {
    try {
        const { email, username, password } = request.body

        const user = new User({ email, username, password, role: 'user' })

        if (!user) {
            return response.status(400).json({ error: "User not created" })
        }

        await User.register(user, password)

        response.status(201).json({ message: "Inscription réussie !" })
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: "Internal server error" })
    }
}

exports.signin = async (request, response) => {
    const user = request.user

    response.status(200).json({ message: "Connexion réussie !" })
}

exports.signout = async (request, response) => {
    request.logout((error) => {
        if (error) {
            return next(error)
        }

        response.status(200).json({ message: "Déconnexion réussie !" })
    })
}