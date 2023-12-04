const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

// Création d'un utilisateur
router.post("/", userController.createUser)

// Récupérer les informations d'un utilisateur
router.get('/:id', userController.getUser)

// Mise à jour des informations d'un utilisateur
router.patch('/:id', userController.updateUser)

// Suppressions des informations d'un utilisateur
router.delete('/:id', userController.deleteUser)

module.exports = router
