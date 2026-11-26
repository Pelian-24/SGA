// Importa Express para crear el enrutador del recurso docentes
const express = require("express")
// Importa el middleware que valida la existencia y validez del token JWT
const { verificarToken } = require("../middlewares/authMiddleware")
// Importa el middleware que restringe acciones según el rol del usuario autenticado
const { verificarRol } = require("../middlewares/rolMiddleware")
// Importa las funciones controladoras del CRUD de docentes
const {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
} = require("../controllers/docentes.controller")

// Crea una instancia de Router para agrupar los endpoints de /docentes
const router = express.Router()

// Consulta todos los docentes (disponible para cualquier usuario autenticado)
router.get("/", verificarToken, obtenerDocentes)
// Consulta un docente por DNI (disponible para cualquier usuario autenticado)
router.get("/:id", verificarToken, obtenerDocente)
// Crea un nuevo docente (solo permitido para el rol "admin")
router.post("/", verificarToken, verificarRol("admin"), crearDocente)
// Modifica un docente existente por DNI (solo permitido para el rol "admin")
router.put("/:id", verificarToken, verificarRol("admin"), actualizarDocente)
// Elimina un docente existente por DNI (solo permitido para el rol "admin")
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarDocente)

// Exporta el enrutador para montarlo en server.js bajo "/docentes"
module.exports = router
