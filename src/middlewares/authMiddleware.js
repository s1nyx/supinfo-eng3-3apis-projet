const isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next()
    }

    response.status(401).json({ error: "Unauthorized" })
}

module.exports = isLoggedIn