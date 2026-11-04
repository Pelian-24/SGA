const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const express = require("express")
const cors = require("cors")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./routes/alumnos.routes")
const docentesRoutes = require("./routes/docentes.routes")
const authRoutes = require("./routes/authRoutes")
const materiaRoutes = require("./routes/materiaRoutes")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/alumnos", alumnosRoutes)
app.use("/docentes", docentesRoutes)
app.use("/auth", authRoutes)
app.use("/materias", materiaRoutes)

const PORT = process.env.PORT || 3000

conectarDB()

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
