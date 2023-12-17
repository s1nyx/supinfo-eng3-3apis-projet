const isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next()
    }

    response.status(401).json({ error: "You must be logged to an account" })
}

const notAuthenticated = (request, response, next) => {
    if (!request.isAuthenticated()) {
        return next()
    }

    response.status(400).json({ error: "You are already authenticated" })
}

module.exports = { isLoggedIn, notAuthenticated }