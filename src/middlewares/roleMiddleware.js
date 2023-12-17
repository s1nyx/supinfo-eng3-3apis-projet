/**
 * Permet de valider les rôles d'un utilisateur en fonction des rôles autorisés
 * @param permittedRoles
 * @returns {(function(*, *, *): void)|*}
 */
const authorizeRoles = (permittedRoles) => {
    return (request, response, next) => {
        const { user } = request

        if (user && permittedRoles.includes(user.role)) {
            next()
        } else {
            response.status(403).json({ message: 'Access denied: Insufficient permissions' })
        }
    }
}

/**
 * Permet de valider les rôles d'un utilisateur en fonction des rôles autorisés ou si l'utilisateur est le propriétaire de l'entité demandée
 * @param permittedRoles
 * @returns {(function(*, *, *): void)|*}
 */
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
