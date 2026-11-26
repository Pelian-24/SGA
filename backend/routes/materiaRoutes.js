// Importa Express para crear el enrutador del recurso materias
const express = require("express")
// Importa el middleware que valida la existencia y validez del token JWT
const { verificarToken } = require("../middlewares/authMiddleware")
// Importa el middleware que restringe acciones según el rol del usuario autenticado
const { verificarRol } = require("../middlewares/rolMiddleware")
// Importa las funciones controladoras del CRUD de materias
const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} = require("../controllers/materiaController")

// Crea una instancia de Router para agrupar los endpoints de /materias
const router = express.Router()

// Consulta todas las materias (disponible para cualquier usuario autenticado)
router.get("/", verificarToken, obtenerMaterias)
// Consulta una materia específica por su código (disponible para cualquier usuario autenticado)
router.get("/:codigo", verificarToken, obtenerMateria)
// Registra una nueva materia (solo permitido para el rol "admin")
router.post("/", verificarToken, verificarRol("admin"), crearMateria)
// Actualiza una materia existente por su código (solo permitido para el rol "admin")
router.put("/:codigo", verificarToken, verificarRol("admin"), actualizarMateria)
// Elimina una materia existente por su código (solo permitido para el rol "admin")
router.delete("/:codigo", verificarToken, verificarRol("admin"), eliminarMateria)

// Exporta el enrutador para montarlo en server.js bajo "/materias"
module.exports = router
