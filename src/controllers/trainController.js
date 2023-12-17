const Train = require('../models/train')
const TrainStation = require('../models/trainStation')


exports.createTrain = async (request, response) => {
    const { name, start_station, end_station, time_of_departure } = request.body
    
    const start = await TrainStation.findOne({name: start_station})
    const end = await TrainStation.findOne({name: end_station})
    
    if (start === null || end === null) {
        return response.status(400).json({error: "Invalid train stations given"})
    }
    
    const train = await Train.create({
        name: name,
        start_station: start_station,
        end_station: end_station,
        time_of_departure: time_of_departure
    })
    
    if (!train) {
        return response.status(400).json({ error: "Train not created" })
    }

    return response.status(201).json({ train })
}

exports.getTrainList = async (request, response) => {

    const sortFields = request.query.sort ? request.query.sort.split(',') : []
    const limit = request.query.limit ? request.query.limit : 10

    if (sortFields.length > 0) {

        sortFields.forEach((field) => {
            let sortOrder = 1
            if (field[0] === "-") {
                sortOrder = -1
                field = field.substring(1)
            }
    
            if (["name", "start", "end", "time"].includes(field)) {
                sortOptions.push([field, sortOrder])
            }
        })
    }


    const trains = await Train.find()
    trains.sort(sortOptions).limit(limit)

    if (!trains) {
        return response.status(404).json({error: "Cannot find any trains"})
    }

    return response.status(200).json(trains)
}

exports.getTrain = async (request, response) => {

    const train = await Train.findById(request.params.id)

    if (!train) {
        return response.status(404).json({ error: "Train not found" })
    }

    return response.status(200).json({ train })
}

exports.updateTrain = async (request, response) => {
    const train = await Train.findByIdAndUpdate(request.params.id, request.body)

    if (!train) {
        return response.status(404).json({ error: "Train not found" })
    }

    return response.status(200).json({ train })
}

exports.deleteTrain = async (request, response) => {
    const train = await Train.findByIdAndDelete(request.params.id)

    if (!train) {
        return response.status(404).json({ error: "Train not found" })
    }

    return response.status(200).json({ message: "Train deleted successfully" })
}