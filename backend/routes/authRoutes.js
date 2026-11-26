// Importa Express para definir las rutas públicas de autenticación
const express = require("express")
// Importa la función controladora encargada de validar credenciales y emitir el JWT
const { login } = require("../controllers/authController")

// Crea una instancia de Router para agrupar los endpoints de /auth
const router = express.Router()

// Ruta pública para iniciar sesión y recibir un token JWT (POST /auth/login)
router.post("/login", login)

// Exporta el enrutador para montarlo en server.js bajo "/auth"
module.exports = router
