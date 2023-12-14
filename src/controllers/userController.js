const User = require('../models/user')

exports.createUser = async (request, response) => {
    // TODO: validation
    const { email, username, password, role } = request.body

    try {
        const user = new User({ email, username, password, role })

        await user.save()

        response.status(201).json({ user })
    } catch (error) {
        response.status(400).json({ error: "User not created" })
    }
}

exports.getUser = async (request, response) => {
    // TODO: valider le param id

    try {
        const user = await User.findById(request.params.id)
        response.status(200).json({ user })
    } catch (error) {
        response.status(404).json({ error: "User not found" })
    }
}

exports.updateUser = async (request, response) => {
    const user = await User.findByIdAndUpdate(request.params.id, request.body)

    if (!user) {
        return response.status(404).json({ error: "User not found" })
    }

    return response.status(200).json({ user })
}

exports.deleteUser = async (request, response) => {
    const user = await User.findByIdAndDelete(request.params.id)

    if (!user) {
        return response.status(404).json({ error: "User not found" })
    }

    return response.status(200).json({ message: "User deleted successfully" })
}