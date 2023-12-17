const bcrypt = require('bcrypt')
const User = require('../models/user')

// 10 est un bon nombre de tours pour la sécurité
const SALT_ROUNDS = 10

exports.createUser = async (request, response) => {
    const { email, username, password, role } = request.body

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const user = new User({ email, username, password: hashedPassword, role })

        if (!user) {
            return response.status(400).json({ error: "User not created" })
        }

        await user.save()

        response.status(201).json({ user })
    } catch (error) {
        response.status(500).json({ error: "Internal server error" })
    }
}

exports.getUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        response.status(200).json({ user })
    } catch (error) {
        response.status(404).json({ error: "User not found" })
    }
}

exports.updateUser = async (request, response) => {
    try {
        const { password } = request.body

        if (password) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
            request.body.password = hashedPassword
        }

        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true })

        response.status(200).json({ user })
    } catch (error) {
        response.status(404).json({ error: "User not found" })
    }
}

exports.deleteUser = async (request, response) => {
    const userId = request.params.id
    const loggedInUserId = request.user._id

    // On vérifie que l'utilisateur qui fait la requête est bien le propriétaire du compte
    if (userId !== loggedInUserId.toString()) {
        return response.status(403).json({ message: 'You can only delete your own account' })
    }

    try {
        await User.findByIdAndDelete(request.params.id)

        response.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        response.status(404).json({ error: "User not found" })
    }
}