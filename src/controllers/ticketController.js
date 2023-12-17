const Ticket = require("../models/ticket")
const Station = require("../models/trainStation")

exports.bookTicket = async (request, response) => {
    try {
        const {username, start_station, end_station} = request.body
    
        const start = await Station.findOne({name: start_station})
        const destination = await Station.findOne({name: end_station})
    
        if (!start || !destination) {
            return response.status(400).json({error: `Invalid stations given`})
        }
    
        const ticket = await Ticket.create({
            username: username,
            start_station: start_station,
            start_station_id: start._id,
            end_station: end_station,
            end_station_id: destination._id
        })

        if (!ticket) {
            return response.status(400).json({error: "Ticket couldn't be created"})
        }

        response.status(201).json(ticket)
    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }

}

exports.getTicketList = async (request, response) => {
    try {
        const tickets = await Ticket.find()

        return response.status(200).json(tickets)
    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
}

exports.validateTicket = async (request, response) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            request.params.id,
            { valid: true },
            { new: true }
        )

        if (!ticket) {
            return response.status(404).json({error: "Ticket not found"})
        }

        return response.status(200).json(ticket)

    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
}