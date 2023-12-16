const { Router } = require('express')
const trainController = require('../controllers/trainController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

// Création d'un train
router.post("/", authMiddleware.isLoggedIn, trainController.createTrain)

// Récupérer les informations de tout les trains
router.get('/', trainController.getTrainList)

// Récupérer les informations d'un seul train
router.get('/:id', trainController.getTrain)

// Mise à jour des informations d'un train
router.patch('/:id', authMiddleware.isLoggedIn, trainController.updateTrain)

// Suppressions des informations d'un train
router.delete('/:id', authMiddleware.isLoggedIn, trainController.deleteTrain)

module.exports = router
