const Train = require('../models/train')
const TrainStation = require('../models/trainStation')


exports.createTrain = async (request, response) => {

    try {
        const { name, start_station, end_station, time_of_departure } = request.body
        
        const start = await TrainStation.findOne({name: start_station})
        const end = await TrainStation.findOne({name: end_station})
        
        if (start === null || end === null) {
            return response.status(400).json({error: "Invalid train stations given"})
        }
        
        const train = await Train.create({
            name: name,
            start_station: start_station,
            start_station_id: start._id,
            end_station: end_station,
            end_station_id: end._id,
            time_of_departure: time_of_departure
        })
        
        if (!train) {
            return response.status(400).json({ error: "Train not created" })
        }
    
        return response.status(201).json({ train })

    } catch (err) {
        response.status(500).json({error: `Internal server error ${err.message}`})
    }
}

exports.getTrainList = async (request, response) => {

    try {
        const sortFields = request.query.sort ? request.query.sort.split(',') : []
        const limit = request.query.limit ? request.query.limit : 10
    
        const query = Train.find()
        const sortOptions = []
        if (sortFields.length > 0) {
    
            sortFields.forEach((field) => {
                let sortOrder = 1
                if (field[0] === "-") {
                    sortOrder = -1
                    field = field.substring(1)
                }
        
                if (["name", "start_station", "end_station"].includes(field)) {
                    sortOptions.push([field, sortOrder])
                }
                query.sort(sortOptions)
            })
        }
    
        query.limit(limit)
        
        const trains = query.exec()
    
        if (!trains) {
            return response.status(404).json({error: "Cannot find any trains"})
        }
    
        return response.status(200).json(trains)

    } catch (err) {
        response.status(500).json({error: `Internal server error ${err.message}`})
    }
}

exports.getTrain = async (request, response) => {

    try {
        const train = await Train.findById(request.params.id)
    
        if (!train) {
            return response.status(404).json({ error: "Train not found" })
        }
    
        return response.status(200).json({ train })

    } catch (err) {
        response.status(500).json({error: `Internal server error ${err.message}`})
    }
}

exports.updateTrain = async (request, response) => {

    try {
        const train = await Train.findByIdAndUpdate(request.params.id, request.body)
    
        if (!train) {
            return response.status(404).json({ error: "Train not found" })
        }
    
        return response.status(200).json({ train })

    } catch (err) {
        response.status(500).json({error: `Internal server error ${err.message}`})
    }
}

exports.deleteTrain = async (request, response) => {

    try {
        const train = await Train.findByIdAndDelete(request.params.id)
    
        if (!train) {
            return response.status(404).json({ error: "Train not found" })
        }
    
        return response.status(200).json({ message: "Train deleted successfully" })

    } catch (err) {
        response.status(500).json({error: `Internal server error ${err.message}`})
    }
}