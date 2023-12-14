const isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next()
    }

    response.status(401).json({ error: "Unauthorized" })
}

const notAuthenticated = (request, response, next) => {
    if (!request.isAuthenticated()) {
        return next()
    }

    response.status(400).json({ error: "Already authenticated" })
}

module.exports = { isLoggedIn, notAuthenticated }