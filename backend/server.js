const express = require('express')
const app = express()
const port = 5000
const db = require("./Config/db")()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'));

app.use(cors())
const route = require("./routes/user.route")
app.use("/api/user", route)

app.listen(port, () => console.log(`http://localhost:${port}`))
