const { Router } = require('express')
const trainController = require('../controllers/trainController')
const validateRequest = require('../middlewares/validateRequestMiddleware')
const { trainSchema, updateTrainSchema, trainIdSchema } = require('../validators/trainValidator')
const { isLoggedIn } = require('../middlewares/authMiddleware')
const { authorizeRoles } = require('../middlewares/roleMiddleware')

const router = Router()

// Création d'un train
router.post("/", validateRequest(trainSchema), isLoggedIn, authorizeRoles(['admin']), trainController.createTrain)

// Récupérer les informations de tous les trains
router.get('/', trainController.getTrainList)

// Récupérer les informations d'un seul train
router.get('/:id', validateRequest(trainIdSchema, "params"), trainController.getTrain)

// Mise à jour des informations d'un train
router.patch('/:id', validateRequest(updateTrainSchema), validateRequest(trainIdSchema, "params"), isLoggedIn, authorizeRoles(['admin']), trainController.updateTrain)

// Suppressions des informations d'un train
router.delete('/:id', validateRequest(trainIdSchema, "params"),isLoggedIn, authorizeRoles(['admin']), trainController.deleteTrain)

module.exports = router
