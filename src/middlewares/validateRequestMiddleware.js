/**
 * Permet de valider les requêtes entrantes en fonction d'un schéma Joi
 * @param schema
 * @param check
 * @returns {(function(*, *, *): (*|undefined))|*}
 */
const validateRequest = (schema, check = 'body') => {
    return (request, response, next) => {
        const { error } = schema.validate(request[check])

        if (error) {
            return response.status(400).json({ error: error.details[0].message })
        }

        next()
    }
}

module.exports = validateRequest