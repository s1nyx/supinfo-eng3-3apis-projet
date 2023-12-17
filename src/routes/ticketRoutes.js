const express = require("express")
const ticketController = require("../controllers/ticketController")
const validateRequest = require("../middlewares/validateRequestMiddleware")
const { ticketSchema, ticketIdSchema} = require("../validators/ticketValidator")
const { isLoggedIn } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")

const router = express.Router()

// Réservation d'un ticket
router.post('/', validateRequest(ticketSchema), isLoggedIn, ticketController.bookTicket)

// Récupérer la liste des tickets
router.get("/", isLoggedIn, authorizeRoles(["admin"]),ticketController.getTicketList)

// Valider un ticket
router.put("/:id", validateRequest(ticketIdSchema, 'params'), isLoggedIn, authorizeRoles(["admin"]), ticketController.validateTicket)

module.exports = router