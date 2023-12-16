const TrainStation = require('../models/trainStation')

exports.createTrainStation = async (request, response) => {
    const { name  } = request.body
    const trainStation = new TrainStation.create({  })

    if (!trainStation) {
        return response.status(400).json({ error: "Train station not created" })
    }

    return response.status(201).json({ trainStation: trainStation })
}

exports.getTrainStationList = async (request, response) => {

    const sortFields = req.query.sort ? req.query.sort.split(',') : []

    let result = TrainStation.find()

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
    // TODO: valider le param id

    const trainStation = await TrainStation.findById(request.params.id)

    if (!trainStation) {
        return response.status(404).json({ error: "Train station not found" })
    }

    return response.status(200).json({ trainStation: trainStation })
}

exports.updateTrainStation = async (request, response) => {
    //Les trains utilisent l'id de la station, donc aucun risque avec une mise à jour
    const trainStation = await TrainStation.findByIdAndUpdate(request.params.id, request.body)

    if (!trainStation) {
        return response.status(404).json({ error: "Train station not found" })
    }

    return response.status(200).json({ trainStation: trainStation })
}

exports.deleteTrainStation = async (request, response) => {
    //TODO: Ajouter une vérif pour éviter de supprimer une station qui va être utiliser
    const train = await TrainStation.findByIdAndDelete(request.params.id)

    if (!train) {
        return response.status(404).json({ error: "Train station not found" })
    }

    return response.status(200).json({ message: "Train station deleted successfully" })
}