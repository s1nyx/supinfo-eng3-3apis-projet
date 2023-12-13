const { Router } = require('express')
const trainController = require('../controllers/trainController')

const router = Router()

// Création d'un utilisateur
router.post("/", trainController.createTrain)

// Récupérer les informations de tout les trains
router.get('/:id', trainController.getTrainList)


// Récupérer les informations d'un utilisateur
router.get('/:id', trainController.getTrain)

// Mise à jour des informations d'un utilisateur
router.patch('/:id', trainController.updateTrain)

// Suppressions des informations d'un utilisateur
router.delete('/:id', trainController.deleteTrain)

module.exports = router
