const hasRoles = (...permittedRoles) => {
    return (request, response, next) => {
        const { user } = request

        if (user && permittedRoles.includes(user.role)) {
            next()
        } else {
            response.status(403).json({ message: 'Forbidden: Insufficient permissions' })
        }
    }
}

const authorizeSelfOrRoles = (permittedRoles) => {
    return (request, response, next) => {
        const loggedInUserId = request.user._id
        const requestedUserId = request.params.id
        const userRole = request.user.role

        console.log(loggedInUserId)
        console.log(requestedUserId)
        console.log(userRole)

        if (loggedInUserId.toString() === requestedUserId || permittedRoles.includes(userRole)) {
            next()
        } else {
            response.status(403).json({ error: "Access denied: Insufficient permissions" })
        }
    }
}

module.exports = { authorizeSelfOrRoles }
