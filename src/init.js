const express = require('express')
const mangoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const trainRoutes = require(('./routes/trainRoutes'))
const app = express()

const PORT = 3000

mangoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err))

app.use(express.json())

app.use('/users', userRoutes)
app.use('/trains', trainRoutes)
app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})