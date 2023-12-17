const { Router } = require('express')
const userController = require('../controllers/userController')
const validateRequest = require('../middlewares/validateRequestMiddleware')
const { userSchema, userIdSchema, updateUserSchema } = require('../validators/userValidator')
const { isLoggedIn } = require('../middlewares/authMiddleware')

const router = Router()

// Création d'un utilisateur
router.post("/", validateRequest(userSchema), userController.createUser)

// Récupérer les informations d'un utilisateur
router.get('/:id', validateRequest(userIdSchema, 'params'), isLoggedIn, userController.getUser)

// Mise à jour des informations d'un utilisateur
router.patch('/:id', validateRequest(userIdSchema, 'params'), validateRequest(updateUserSchema), isLoggedIn, userController.updateUser)

// Suppressions des informations d'un utilisateur
router.delete('/:id', validateRequest(userIdSchema, 'params'), isLoggedIn, userController.deleteUser)

module.exports = router
