const { Router } = require('express')
const userController = require('../controllers/userController')
const validateRequest = require('../middlewares/validateRequestMiddleware')
const { userSchema, userIdSchema, updateUserSchema } = require('../validators/userValidator')
const { isLoggedIn } = require('../middlewares/authMiddleware')
const { authorizeSelfOrRoles } = require('../middlewares/roleMiddleware')

const router = Router()

// Création d'un utilisateur
router.post("/", validateRequest(userSchema), userController.createUser)

// Récupérer les informations d'un utilisateur
router.get('/:id', isLoggedIn, validateRequest(userIdSchema, 'params'), authorizeSelfOrRoles(['employee', 'admin']), userController.getUser)

// Mise à jour des informations d'un utilisateur
router.patch('/:id', isLoggedIn, validateRequest(userIdSchema, 'params'), validateRequest(updateUserSchema), authorizeSelfOrRoles(['admin']), userController.updateUser)

// Suppressions des informations d'un utilisateur
router.delete('/:id', isLoggedIn, validateRequest(userIdSchema, 'params'), userController.deleteUser)

module.exports = router
