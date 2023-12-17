const authorizeRoles = (...permittedRoles) => {
    return (request, response, next) => {
        const { user } = request

        if (user && permittedRoles.includes(user.role)) {
            next()
        } else {
            response.status(403).json({ message: 'Access denied: Insufficient permissions' })
        }
    }
}

const authorizeSelfOrRoles = (permittedRoles) => {
    return (request, response, next) => {
        const loggedInUserId = request.user._id
        const requestedUserId = request.params.id
        const userRole = request.user.role

        if (loggedInUserId.toString() === requestedUserId || permittedRoles.includes(userRole)) {
            next()
        } else {
            response.status(403).json({ error: "Access denied: Insufficient permissions" })
        }
    }
}

module.exports = { authorizeRoles, authorizeSelfOrRoles }
