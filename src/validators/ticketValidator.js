const joi = require('joi')

const ticketSchema = joi.object({
    username: joi.string().required(),
    start_station: joi.string().required(),
    end_station: joi.string().required()
})

//Should not be required.
const updateTicketSchema = joi.object({
    username: joi.string(),
    start_station: joi.string(),
    end_station: joi.string(),
}).min(1)


const ticketIdSchema = joi.object({
    id: joi.string().required()
})

module.exports = { ticketSchema, ticketIdSchema, updateTicketSchema }