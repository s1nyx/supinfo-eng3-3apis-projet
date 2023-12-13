const express = require('express')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const trainRoutes = require(('./routes/trainRoutes'))
const app = express()

const PORT = 3000

app.use('/users', userRoutes)
app.use('/trains', trainRoutes)
app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})