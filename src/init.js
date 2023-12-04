const express = require('express')
const userRoutes = require('./routes/userRoutes')
const app = express()

const PORT = 3000

app.use('/', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})