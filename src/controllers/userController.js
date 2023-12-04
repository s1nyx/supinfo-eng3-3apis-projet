const User = require('../models/user')

exports.createUser = async (request, response) => {
    const { email, username, password, role } = request.body
    const user = new User.create({ email, username, password, role })

    if (!user) {
        return response.status(400).json({ error: "User not created" })
    }

    return response.status(201).json({ user })
}

exports.getUser = async (request, response) => {
    // TODO: valider le param id

    const user = await User.findById(request.params.id)

    if (!user) {
        return response.status(404).json({ error: "User not found" })
    }

    return response.status(200).json({ user })
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