// Importa el modelo Usuario para consultar las credenciales en MongoDB
const Usuario = require("../models/Usuario")
// Importa bcrypt para comparar la contraseña ingresada con el hash almacenado
const bcrypt = require("bcrypt")
// Importa jsonwebtoken para generar y firmar el token JWT de sesión
const jwt = require("jsonwebtoken")

// Controlador que autentica a un usuario y devuelve su token JWT junto con sus datos básicos
const login = async (req, res) => {
    try {
        // Extrae el email y la contraseña enviados en el cuerpo de la petición
        const { email, password } = req.body

        // Valida que ambos campos hayan sido enviados
        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debés ingresar email y contraseña"
            })
        }

        // Busca el usuario por email normalizado e incluye explícitamente el campo password
        const usuario = await Usuario
            .findOne({ email: String(email).trim().toLowerCase() })
            .select("+password")

        // Si no existe ningún usuario con ese email, responde con error 401 genérico
        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        // Compara la contraseña en texto plano con el hash guardado en la base de datos
        const coincide = await bcrypt.compare(password, usuario.password)

        // Si la contraseña no coincide, rechaza el inicio de sesión con 401
        if (!coincide) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        // Firma un token JWT con el identificador y rol del usuario usando la clave secreta del .env
        const token = jwt.sign(
            {
                id: usuario._id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                // Define el tiempo de expiración del token (por defecto 2 horas)
                expiresIn: process.env.JWT_EXPIRES_IN || "2h"
            }
        )

        // Devuelve el token y los datos no sensibles del usuario autenticado
        return res.status(200).json({
            mensaje: "Login correcto",
            token,
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        })
    } catch (error) {
        // Registra cualquier error inesperado en consola y responde con código 500
        console.error("Error en login:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}

// Exporta el controlador login para asociarlo en authRoutes.js
module.exports = { login }
