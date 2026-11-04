/**
 * @copyright 2026 EG Industries. Todos los derechos reservados.
 * @license MIT — Ver archivo LICENSE en la raíz del proyecto.
 *
 * Este archivo es parte de Sistema de Gestión Académica (SGA).
 */

const path = require("path")
// Carga explícita del archivo .env ubicado en la carpeta backend sin importar desde dónde se ejecute Node
require("dotenv").config({ path: path.join(__dirname, ".env") })

const express = require("express")
const cors = require("cors")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./routes/alumnos.routes")
const docentesRoutes = require("./routes/docentes.routes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// MIDDLEWARES GLOBALES: Habilitan el parseo de JSON en req.body y permiten peticiones CORS desde el Frontend
app.use(cors())
app.use(express.json())

// RUTA DE ESTADO (HEALTHCHECK): Permite verificar rápidamente en el navegador que la API está activa
app.get("/", (req, res) => {
    res.json({
        mensaje: "API del Sistema de Gestión Académica (SGA) funcionando correctamente",
        estado: "ok",
        endpoints: ["/alumnos", "/docentes", "/auth/login"]
    })
})

// MONTAJE DE RUTAS MODULARES: Asocia cada prefijo de URL con su respectivo enrutador de recursos
app.use("/alumnos", alumnosRoutes)
app.use("/docentes", docentesRoutes)
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 3000

/**
 * Inicializa la conexión a MongoDB antes de poner el servidor HTTP a escuchar peticiones.
 */
async function iniciarServidor() {
    await conectarDB()
    app.listen(PORT, () => {
        console.info(`Servidor funcionando en http://localhost:${PORT}`)
    })
}

iniciarServidor()
