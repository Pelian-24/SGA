// Importa el módulo nativo path para construir la ruta absoluta al archivo .env
const path = require("path")
// Carga las variables de entorno (PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN) desde backend/.env
require("dotenv").config({ path: path.join(__dirname, ".env") })

// Importa Express para crear el servidor HTTP y definir la API REST
const express = require("express")
// Importa CORS para permitir peticiones desde el frontend (local o Vercel)
const cors = require("cors")

// Importa la función que establece la conexión con MongoDB mediante Mongoose
const conectarDB = require("./config/database")
// Importa los enrutadores de cada módulo del sistema
const alumnosRoutes = require("./routes/alumnos.routes")
const docentesRoutes = require("./routes/docentes.routes")
const authRoutes = require("./routes/authRoutes")
const materiaRoutes = require("./routes/materiaRoutes")

// Inicializa la aplicación principal de Express
const app = express()

// Middleware que convierte automáticamente el cuerpo JSON de las peticiones en req.body
app.use(express.json())
// Middleware que habilita el intercambio de recursos entre distintos orígenes (CORS)
app.use(cors())

// Asocia cada prefijo de URL con su archivo de rutas correspondiente
app.use("/alumnos", alumnosRoutes)
app.use("/docentes", docentesRoutes)
app.use("/auth", authRoutes)
app.use("/materias", materiaRoutes)

// Usa el puerto asignado por el entorno (Render en producción) o el 3000 en desarrollo local
const PORT = process.env.PORT || 3000

// Abre la conexión con la base de datos MongoDB definida en MONGO_URI
conectarDB()

// Pone al servidor a escuchar peticiones entrantes en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})
