// Importa jsonwebtoken para verificar la firma y vigencia de los tokens JWT
const jwt = require("jsonwebtoken")

// Middleware de autenticación: se ejecuta antes del controlador para proteger rutas privadas
const verificarToken = (req, res, next) => {
    try {
        // Lee el encabezado Authorization enviado por el cliente (Express lo normaliza a minúsculas)
        const authHeader = req.headers.authorization

        // Comprueba que el encabezado exista y siga el formato "Bearer <token>"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                mensaje: "Acceso no autorizado"
            })
        }

        // Separa "Bearer" del token y toma únicamente el JWT
        const token = authHeader.split(" ")[1]

        // Valida la firma criptográfica y la fecha de expiración usando JWT_SECRET
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // Guarda el payload verificado ({ id, rol }) en req.usuario para middlewares y controladores siguientes
        req.usuario = usuario

        // Permite que la petición continúe hacia el siguiente middleware o controlador
        next()
    } catch {
        // Responde 401 si el token fue alterado, está mal formado o expiró
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        })
    }
}

// Exporta el middleware para utilizarlo en los archivos de rutas
module.exports = { verificarToken }
