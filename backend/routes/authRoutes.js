const express = require("express")
const { login } = require("../controllers/authController")

const router = express.Router()

// RUTAS DE AUTENTICACIÓN: Prefijo base "/auth"
router.post("/login", login)

module.exports = router
