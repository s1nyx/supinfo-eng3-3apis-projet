const joi = require('joi')

const trainSchema = joi.object({
    name: joi.string().required(),
    start_station: joi.string().required(),
    end_station: joi.string().required(),
    time_of_departure: joi.date()
})

const updateTrainSchema = joi.object({
    name: joi.string(),
    start_station: joi.string(),
    end_station: joi.string(),
    time_of_departure: joi.date()
}).min(1)

const trainIdSchema = joi.object({
    id: joi.string().required()
})

module.exports = { trainSchema, trainIdSchema, updateTrainSchema }