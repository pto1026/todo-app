const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(require('./routes/record'))

const dbo = require('./db/conn')

app.listen(PORT, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err)
    })
    console.log(`Server is up and running on port: ${PORT}`)
})