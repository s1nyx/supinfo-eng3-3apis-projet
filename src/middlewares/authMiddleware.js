/**
 * Permet de vérifier qu'un utilisateur est authentifié
 * @param request
 * @param response
 * @param next
 * @returns {*}
 */
const isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next()
    }

    response.status(401).json({ error: "You must be logged to an account" })
}

/**
 * Permet de vérifier qu'un utilisateur n'est pas authentifié
 * @param request
 * @param response
 * @param next
 * @returns {*}
 */
const notAuthenticated = (request, response, next) => {
    if (!request.isAuthenticated()) {
        return next()
    }

    response.status(400).json({ error: "You are already authenticated" })
}

module.exports = { isLoggedIn, notAuthenticated }