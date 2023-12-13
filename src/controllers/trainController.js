const Train = require('../models/train')

exports.createTrain = async (request, response) => {
    const { name  } = request.body
    const train = new Train.create({  })

    if (!train) {
        return response.status(400).json({ error: "Train not created" })
    }

    return response.status(201).json({ train })
}

exports.getTrainList = async (request, response) => {
    const trains = await Train.find()

    if (!trains) {
        return response.status(404).json({error: "Cannot find any trains"})
    }

    return response.status(200).json(trains)
}

exports.getTrain = async (request, response) => {
    // TODO: valider le param id

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