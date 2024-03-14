const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const { PORT } = process.env
const warehouse = require("./routes/warehouseRoutes.js")
const inventoryItems = require("./routes/itemsRoutes.js")

app.use(express.json())
app.use(cors())

app.use("/warehouses", warehouse)
app.use("/items", inventoryItems)
app.listen(PORT)

