const { Router } = require('express')
const trainController = require('../controllers/trainController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

// Création d'un train
router.post("/", trainController.createTrain)

// Récupérer les informations de tout les trains
router.get('/', trainController.getTrainList)

// Récupérer les informations d'un seul train
router.get('/:id', trainController.getTrain)

// Mise à jour des informations d'un train
router.patch('/:id', trainController.updateTrain)

// Suppressions des informations d'un train
router.delete('/:id', trainController.deleteTrain)

module.exports = router
