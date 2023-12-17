const TrainStation = require('../models/trainStation')
const Train = require('../models/train')
const fs = require("fs")
const path = require("path")
const jimp = require("jimp")
const train = require('../models/train')

exports.createTrainStation = async (request, response) => {
    try {
        const { name, open_hour, close_hour } = request.body
        const trainStation = await TrainStation.create({
            name: name,
            open_hour: open_hour,
            close_hour: close_hour,
            image: "uploads/info.png" //Image is the file path for the image
        })

        if (!trainStation) {
            return response.status(400).json({ error: "Train station not created" })
        }

        return response.status(201).json(trainStation)
    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
    
}

exports.getTrainStationList = async (request, response) => {
    try {
        const sortFields = request.query.sort ? request.query.sort.split(',') : []
    
        let query = TrainStation.find()
        const sortOptions = []
    
        if (sortFields.length > 0) { //In case we need to sort
            sortFields.forEach((field) => {
                let sortOrder = 1
        
                if (field[0] === "-") {
                    sortOrder = -1
                    field = field.substring(1)
                }
    
                //Only field that we can sort by according to the subject is the name
                
                if ( ["name"].includes(field) ) { 
                    sortOptions.push([field, sortOrder])
                }
    
                query.sort(sortOptions)
            })
        }
    
        const stations = await query.exec()

        if (!stations) {
            return response.status(404).json({error: "Cannot find any train stations"})
        }
    
        return response.status(200).json(stations)
    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
}

exports.getTrainStation = async (request, response) => {
    try {
        const trainStation = await TrainStation.findOne({name: request.params.name})
        
        if (!trainStation) {
            return response.status(404).json({ error: "Train station not found" })
        }
    
        return response.status(200).json(trainStation)

    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
}

exports.updateTrainStation = async (request, response) => {
    try {
        const trainStation = await TrainStation.findByIdAndUpdate(request.params.id, request.body, { new: true })
    
        if (!trainStation) {
            return response.status(404).json({ error: "Train station not found" })
        }
    
        return response.status(200).json(trainStation)

    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
}

//Envoie de l'image pour la station de train
exports.uploadStationImage = async (request, response) => { 

    try {
        const stationId = request.params.id
    
        const file = request.file
    
        //Block invalid extensions and filename
        const filePath = `uploads\\${file.originalname}`

        if (file.originalname === "info.png") {
            return response.status(401).json({error: `Filename cannot be info.png`})
        }
    
        const extension = filePath.split('.').pop()
        
        if (!["png", "jpeg", "jpg"].includes(extension)) {
            return response.status(401).json({error: `Only png or jpeg files are allowed`})
        }
        
        
        //Save the file
        fs.rename(file.path, filePath, async (error) => {
            if (error) {
                console.error(error)
                return response.status(500).json({error: `Internal error saving the iamge`})
            }
    
            //Resize image if it is too big
            const maxSizeInBytes = 10 * 1024 * 1024 //10 MB max size

            if (file.size > maxSizeInBytes) {
                let image = await jimp.read(filePath)

                image.resize(200, 200)
                image.write(filePath)
            }
        })
        
        const trainStation = await TrainStation.findByIdAndUpdate(
            stationId,
            {image: filePath},
            {new: true}
        )
    
        if (!trainStation) {
            return response.status(404).json({error: `No station with id ${stationId} was found`})
        }
        
        response.status(200).json(trainStation)
    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }

}

exports.deleteTrainStation = async (request, response) => {

    try {
        const trainStation = await TrainStation.findByIdAndDelete(request.params.id)
    
        if (!trainStation) {
            return response.status(404).json({ error: "Train station couldn't be found" })
        }
    
        // Verify that no trains should go there
        const trains = await Train.find()
    
        const filtered = trains.filter((train) => {
            return (train.start_station_id === request.params.id || train.end_station_id === request.params.id)
        })
    
        filtered.forEach(async (train) => {
            const deleted = await Train.findByIdAndDelete(train._id)
        })
    
        return response.status(200).json({ message: "Train station deleted successfully" })
    } catch (err) {
        console.error(err)
        response.status(500).json({error: "Internal server error"})
    }
}