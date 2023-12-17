const express = require("express")
const ticketController = require("../controllers/ticketController")
const validateRequest = require("../middlewares/validateRequestMiddleware")
const { ticketSchema, ticketIdSchema} = require("../validators/ticketValidator")
const { isLoggedIn } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")

const router = express.Router()


router.post('/', validateRequest(ticketSchema), isLoggedIn, ticketController.bookTicket)

router.get("/", isLoggedIn, authorizeRoles(["admin"]),ticketController.getTicketList)

router.put("/:id", validateRequest(ticketIdSchema), isLoggedIn, authorizeRoles(["admin"]), ticketController.validateTicket)

module.exports = router