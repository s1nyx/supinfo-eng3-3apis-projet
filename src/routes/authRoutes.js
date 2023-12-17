const { Router } = require('express')
const authController = require('../controllers/authController')
const passport = require('passport')
const { isLoggedIn, notAuthenticated } = require('../middlewares/authMiddleware')

const router = Router()

// Inscription d'un utilisateur
router.post('/signup', authController.signup)

// Connexion d'un utilisateur
router.post('/signin', notAuthenticated, passport.authenticate('local'), authController.signin)

// Déconnexion de l'utilisateur
router.post('/signout', isLoggedIn, authController.signout)

module.exports = router