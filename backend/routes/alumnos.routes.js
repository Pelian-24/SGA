const express = require("express")
const {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require("../controllers/alumnos.controller")

const router = express.Router()

// RUTAS CRUD DE ALUMNOS: Prefijo base "/alumnos"
router.get("/", obtenerAlumnos)
router.get("/:id", obtenerAlumno)
router.post("/", crearAlumno)
router.put("/:id", actualizarAlumno)
router.delete("/:id", eliminarAlumno)

module.exports = router
