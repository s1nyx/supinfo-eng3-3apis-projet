const { Router } = require('express')
const trainStationController = require('../controllers/trainStationController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

// Création d'un train
router.post("/", trainStationController.createTrainStation)

// Récupérer les informations de tout les trains
router.get('/', trainStationController.getTrainStationList)

// Récupérer les informations d'un seul train
router.get('/:id', trainStationController.getTrainStation)

// Mise à jour des informations d'un train
router.patch('/:id', trainStationController.updateTrainStation)

// Suppressions des informations d'un train
router.delete('/:id', trainStationController.deleteTrainStation)

module.exports = router
