const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt")

/**
 * Autentica a un usuario verificando su correo electrónico y comparando el hash de su contraseña con bcrypt.
 *
 * @param {import("express").Request} req Objeto de petición HTTP con email y password.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debés ingresar email y contraseña"
            })
        }

        const usuario = await Usuario
            .findOne({ email: String(email).trim().toLowerCase() })
            .select("+password")

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        const coincide = await bcrypt.compare(password, usuario.password)

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        const datosUsuario = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        }

        return res.status(200).json({
            mensaje: "Login correcto",
            ...datosUsuario,
            usuario: datosUsuario
        })
    } catch (error) {
        console.error("Error en login:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}

module.exports = { login }
