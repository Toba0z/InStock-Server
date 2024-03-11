const express = require('express')      
const app = express()
require('dotenv').config()

const cors = require('cors')

const {PORT} = process.env

app.use(express.json())
app.use(cors())
app.get('/', (req, res, next)=> {
    res.send('Hello guys')
    next()
})
console.log(5)
app.listen(PORT)