// Importa Express para crear el enrutador del recurso alumnos
const express = require("express")
// Importa el middleware que valida la existencia y validez del token JWT
const { verificarToken } = require("../middlewares/authMiddleware")
// Importa el middleware que restringe acciones según el rol del usuario autenticado
const { verificarRol } = require("../middlewares/rolMiddleware")
// Importa las funciones controladoras del CRUD de alumnos
const {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require("../controllers/alumnos.controller")

// Crea una instancia de Router para agrupar los endpoints de /alumnos
const router = express.Router()

// Consulta todos los alumnos (disponible para cualquier usuario autenticado)
router.get("/", verificarToken, obtenerAlumnos)
// Consulta un alumno por legajo (disponible para cualquier usuario autenticado)
router.get("/:id", verificarToken, obtenerAlumno)
// Crea un nuevo alumno (solo permitido para el rol "admin")
router.post("/", verificarToken, verificarRol("admin"), crearAlumno)
// Modifica un alumno existente por legajo (solo permitido para el rol "admin")
router.put("/:id", verificarToken, verificarRol("admin"), actualizarAlumno)
// Elimina un alumno existente por legajo (solo permitido para el rol "admin")
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarAlumno)

// Exporta el enrutador para montarlo en server.js bajo "/alumnos"
module.exports = router
