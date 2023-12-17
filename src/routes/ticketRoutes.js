const express = require("express")
const ticketController = require("../controllers/ticketController")

const router = express.Router()


router.post('/', ticketController.bookTicket)

router.get("/", ticketController.getTicketList)

router.put("/:id", ticketController.validateTicket)

module.exports = router