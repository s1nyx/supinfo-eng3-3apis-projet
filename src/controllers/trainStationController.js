const TrainStation = require('../models/trainStation')
const fs = require("fs")
const path = require("path")
const utils = require("../utils/resize")

exports.createTrainStation = async (request, response) => {
    const { name, open_hour, close_hour, image } = request.body
    const trainStation = await TrainStation.create({
        name: name,
        open_hour: open_hour,
        close_hour: close_hour,
        image: image //Image is the file path for the image
    })

    if (!trainStation) {
        return response.status(400).json({ error: "Train station not created" })
    }

    return response.status(201).json({ trainStation: trainStation })
}

exports.getTrainStationList = async (request, response) => {

    const sortFields = request.query.sort ? request.query.sort.split(',') : []

    let result = await TrainStation.find()

    if (sortFields.length > 0) { //In case we need to sort
        const sortOptions = []
        sortFields.foreach((field) => {
            const sortOrder = 1
    
            if (field[0] === "-") {
                sortOrder = -1
                field = field.substring(1)
            }

            //Only field that we can sort by according to the subject is the name
            
            if ( ["name"].includes(field) ) { 
                sortOptions.push([field, sortOrder])
            }

            result.sort(sortOptions)
        })
    }

    if (!result) {
        return result.status(404).json({error: "Cannot find any train stations"})
    }

    return response.status(200).json(result)
}

exports.getTrainStation = async (request, response) => {

    const trainStation = await TrainStation.findOne({name: request.params.name})

    if (!trainStation) {
        return response.status(404).json({ error: "Train station not found" })
    }

    return response.status(200).json(trainStation)
}

exports.updateTrainStation = async (request, response) => {

    const trainStation = await TrainStation.findByIdAndUpdate(request.params.id, request.body)

    if (!trainStation) {
        return response.status(404).json({ error: "Train station not found" })
    }

    return response.status(200).json({ trainStation: trainStation })
}

//Envoie de l'image pour la station de train
exports.uploadStationImage = async (request, response) => { 
    const stationName = request.params.name

    const file = request.file

    const maxSizeInBytes = 10 * 1024 * 1024 //10 MB max size
    if (file.size > maxSizeInBytes) {
        return resizeImage.status(400).json({error: `File size exceeds the 10 MB limit!`})
    }

    const filePath = `uploads\\${file.originalname}`

    fs.rename(file.path, filePath, (error) => {
        if (error) {
           return response.status(500).json({error: `Internal error saving the iamge`})
        }
    })

    const trainStation = await TrainStation.findOneAndUpdate(
        {name: stationName},
        {image: filePath}
    )

    if (!trainStation) {
        return response.status(404).json({error: `No station named ${stationName} was found`})
    }
    
    response.status(200).json(trainStation)

}

exports.deleteTrainStation = async (request, response) => {
    //TODO: Ajouter une vérif pour éviter de supprimer une station qui va être utiliser
    const train = await TrainStation.findByIdAndDelete(request.params.id)

    if (!train) {
        return response.status(404).json({ error: "Train station not found" })
    }

    return response.status(200).json({ message: "Train station deleted successfully" })
}