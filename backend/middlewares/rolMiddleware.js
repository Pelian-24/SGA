// Middleware de autorización por rol: recibe los roles permitidos y valida req.usuario.rol
const verificarRol = (...rolesPermitidos) => {
    // Retorna la función middleware que Express ejecuta después de verificarToken
    return (req, res, next) => {
        // Verifica que exista un usuario autenticado previamente por verificarToken
        if (!req.usuario) {
            return res.status(401).json({
                mensaje: "Primero debés autenticarte"
            })
        }

        // Comprueba si el rol del usuario está incluido dentro de los roles autorizados
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: "No tenés permisos para esta operación"
            })
        }

        // Si el rol está autorizado, deja continuar la petición hacia el controlador
        next()
    }
}

// Exporta el middleware para restringir operaciones de escritura en las rutas
module.exports = { verificarRol }
