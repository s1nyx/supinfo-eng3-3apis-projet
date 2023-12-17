const joi = require('joi')

const stationSchema = joi.object({
    name: joi.string().required(),
    open_hour: joi.date().required(),
    close_hour: joi.date().required()
})

const updateStationSchema = joi.object({
    name: joi.string(),
    open_hour: joi.date(),
    end_hour: joi.date(),
}).min(1)

const stationIdSchema = joi.object({
    id: joi.string().required()
})

const stationNameSchema = joi.object({
    name: joi.string().required()
})

module.exports = { stationSchema, stationIdSchema, updateStationSchema, stationNameSchema }