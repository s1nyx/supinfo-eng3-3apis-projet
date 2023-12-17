const { Router } = require('express')
const trainStationController = require('../controllers/trainStationController')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer')

const upload = multer({dest: 'uploads/'})
const router = Router()

// Création d'un train
router.post("/", trainStationController.createTrainStation)

// Récupérer les informations de tout les trains
router.get('/', trainStationController.getTrainStationList)

// Récupérer les informations d'une seul station
router.get('/:name', trainStationController.getTrainStation)

router.put('/:name', upload.single("image"), trainStationController.uploadStationImage)

// Mise à jour des informations d'une station
router.patch('/:id', trainStationController.updateTrainStation)

// Suppressions des informations d'une station
// Utilise l'ID comme forme de confirmation (connaître le nom n'est pas suffisant)
router.delete('/:id', trainStationController.deleteTrainStation)

module.exports = router
