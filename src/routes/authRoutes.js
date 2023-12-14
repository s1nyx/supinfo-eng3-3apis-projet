const { Router } = require('express')
const authController = require('../controllers/authController')
const passport = require('passport')
const isLoggedIn = require('../middlewares/authMiddleware')

const router = Router()

router.post('/signup', authController.signup)
router.post('/signin', passport.authenticate('local'), authController.signin)
router.post('/signout', isLoggedIn, authController.signout)

module.exports = router
