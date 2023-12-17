const { Router } = require('express')
const trainStationController = require('../controllers/trainStationController')
const { isLoggedIn } = require('../middlewares/authMiddleware')
const { authorizeRoles } = require('../middlewares/roleMiddleware')
const multer = require('multer')
const validateRequest = require('../middlewares/validateRequestMiddleware')
const { stationSchema, stationNameSchema, stationIdSchema, updateStationSchema } = require('../validators/stationValidator')

const upload = multer({dest: 'uploads/'})
const router = Router()

// Création d'un train
router.post("/", validateRequest(stationSchema), isLoggedIn, authorizeRoles(['admin']), trainStationController.createTrainStation)

// Récupérer les informations de tout les trains
router.get('/', trainStationController.getTrainStationList)

// Récupérer les informations d'une seul station
router.get('/:name', validateRequest(stationNameSchema, 'params'), trainStationController.getTrainStation)

router.put('/:id', validateRequest(stationIdSchema, 'params'), isLoggedIn, authorizeRoles(['admin']), upload.single("image"), trainStationController.uploadStationImage)

// Mise à jour des informations d'une station
router.patch('/:id', validateRequest(updateStationSchema), validateRequest(stationIdSchema, 'params'), isLoggedIn, authorizeRoles(['admin']), trainStationController.updateTrainStation)

// Suppressions des informations d'une station
// Utilise l'ID comme forme de confirmation (connaître le nom n'est pas suffisant)
router.delete('/:id', validateRequest(stationIdSchema, 'params'), isLoggedIn, authorizeRoles(['admin']), trainStationController.deleteTrainStation)

module.exports = router
