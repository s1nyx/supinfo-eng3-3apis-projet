const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.createUser = async (request, response) => {
    const { email, username, password, role } = request.body

    try {
        const user = new User({ email, username, role })

        if (!user) {
            return response.status(400).json({ error: "User couldn't be created" })
        }

        await User.register(user, password)

        response.status(201).json({ user })
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: "Internal server error" })
    }
}

exports.getUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.id)

        response.status(200).json({ user })
    } catch (error) {
        console.error(error)
        response.status(404).json({ error: "User not found" })
    }
}

exports.updateUser = async (request, response) => {
    const { password, ...otherUpdates } = request.body
    const user = await User.findById(userIdToUpdate)

    if (!user) {
        return response.status(404).json({ error: "User not found" })
    }

    if (password) {
        await user.setPassword(password)
        await user.save()
    }

    if (Object.keys(otherUpdates).length > 0) {
        await User.findByIdAndUpdate(userIdToUpdate, otherUpdates, { new: true })
    }

    response.status(200).json({ user })
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