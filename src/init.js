require('dotenv').config();

const express = require('express')
const mangoose = require('mongoose')
const session = require('express-session');
const passport = require('passport');

const User = require('./models/user')

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const trainRoutes = require(('./routes/trainRoutes'))
const app = express()

const PORT = 3000

mangoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err))


// Utilisation du json
app.use(express.json())

// Utilisation des sessions
app.use(session({
    secret: process.env.SESSION_SECRET, // Remplacez par une chaîne de caractères secrète
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', userRoutes)
app.use('/trains', trainRoutes)
app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})