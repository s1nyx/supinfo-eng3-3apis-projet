const { Router } = require('express')
const trainController = require('../controllers/trainController')
const { isLoggedIn } = require('../middlewares/authMiddleware')
const { authorizeRoles } = require('../middlewares/roleMiddleware')

const router = Router()

// Création d'un train
router.post("/", isLoggedIn, authorizeRoles(['admin']), trainController.createTrain)

// Récupérer les informations de tous les trains
router.get('/', trainController.getTrainList)

// Récupérer les informations d'un seul train
router.get('/:id', trainController.getTrain)

// Mise à jour des informations d'un train
router.patch('/:id', isLoggedIn, authorizeRoles(['admin']), trainController.updateTrain)

// Suppressions des informations d'un train
router.delete('/:id', isLoggedIn, authorizeRoles(['admin']), trainController.deleteTrain)

module.exports = router
