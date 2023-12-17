require('dotenv').config()

const express = require('express')
const mangoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const User = require('./models/user')

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const trainRoutes = require(('./routes/trainRoutes'))
const trainStationRoutes = require('./routes/trainStationRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const app = express()

const PORT = process.env.PORT || 3000

mangoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log(err))


// Utilisation du json
app.use(express.json())

// Utilisation des sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/users', userRoutes)
app.use('/trains', trainRoutes)
app.use('/stations', trainStationRoutes)
app.use('/auth', authRoutes)
app.use('/tickets', ticketRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

module.exports = app