const Alumno = require("../models/Alumno")

/**
 * Obtiene el listado completo de alumnos registrados en MongoDB, ordenados por legajo.
 *
 * @param {import("express").Request} req Objeto de petición HTTP.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function obtenerAlumnos(req, res) {
    try {
        const alumnos = await Alumno.find().sort({ legajo: 1 })
        return res.json(alumnos)
    } catch (error) {
        console.error("Error al obtener alumnos:", error)
        return res.status(500).json({
            mensaje: "No se pudo obtener la lista de alumnos"
        })
    }
}

/**
 * Busca y devuelve un alumno específico según su número de legajo.
 *
 * @param {import("express").Request} req Objeto de petición HTTP con req.params.id.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function obtenerAlumno(req, res) {
    try {
        const legajo = Number(req.params.id)
        if (!Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo debe ser un número válido"
            })
        }

        const alumno = await Alumno.findOne({ legajo })
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            })
        }

        return res.json(alumno)
    } catch (error) {
        console.error("Error al obtener alumno:", error)
        return res.status(500).json({
            mensaje: "Error interno al buscar el alumno"
        })
    }
}

/**
 * Valida los datos del cuerpo de la petición y registra un nuevo alumno en MongoDB.
 *
 * @param {import("express").Request} req Objeto de petición HTTP con legajo, nombre, carrera y correo.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function crearAlumno(req, res) {
    try {
        const { legajo, nombre, carrera, correo } = req.body

        if (legajo === undefined || legajo === null || !nombre || !carrera || !correo) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }

        if (typeof nombre !== "string" || nombre.trim().length < 2) {
            return res.status(400).json({
                mensaje: "El nombre debe ser un texto válido"
            })
        }

        if (typeof legajo !== "number" || !Number.isFinite(legajo) || legajo <= 0) {
            return res.status(400).json({
                mensaje: "El legajo debe ser un número válido mayor a cero"
            })
        }

        const existe = await Alumno.findOne({ legajo })
        if (existe) {
            return res.status(400).json({
                mensaje: "El legajo ya existe"
            })
        }

        const nuevoAlumno = await Alumno.create({
            legajo,
            nombre: nombre.trim(),
            carrera: String(carrera).trim(),
            correo: String(correo).trim().toLowerCase()
        })

        return res.status(201).json(nuevoAlumno)
    } catch (error) {
        console.error("Error al crear alumno:", error)
        return res.status(500).json({
            mensaje: "No fue posible registrar el alumno en la base de datos"
        })
    }
}

/**
 * Actualiza los datos de un alumno existente identificado por su legajo.
 *
 * @param {import("express").Request} req Objeto de petición HTTP.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function actualizarAlumno(req, res) {
    try {
        const legajo = Number(req.params.id)
        if (!Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo proporcionado no es válido"
            })
        }

        const { nombre, carrera, correo } = req.body
        if (!nombre || !carrera || !correo) {
            return res.status(400).json({
                mensaje: "Nombre, carrera y correo son obligatorios para actualizar"
            })
        }

        const alumno = await Alumno.findOneAndUpdate(
            { legajo },
            {
                nombre: String(nombre).trim(),
                carrera: String(carrera).trim(),
                correo: String(correo).trim().toLowerCase()
            },
            { returnDocument: "after", runValidators: true }
        )

        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            })
        }

        return res.json(alumno)
    } catch (error) {
        console.error("Error al actualizar alumno:", error)
        return res.status(500).json({
            mensaje: "Error interno al actualizar el alumno"
        })
    }
}

/**
 * Elimina un alumno de la colección de MongoDB según su número de legajo.
 *
 * @param {import("express").Request} req Objeto de petición HTTP.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function eliminarAlumno(req, res) {
    try {
        const legajo = Number(req.params.id)
        if (!Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo proporcionado no es válido"
            })
        }

        const alumno = await Alumno.findOneAndDelete({ legajo })
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            })
        }

        return res.json({ mensaje: "Alumno eliminado correctamente" })
    } catch (error) {
        console.error("Error al eliminar alumno:", error)
        return res.status(500).json({
            mensaje: "Error interno al eliminar el alumno"
        })
    }
}

module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}
