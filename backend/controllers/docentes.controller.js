const Docente = require("../models/Docente")

/**
 * Obtiene el listado completo de docentes registrados en MongoDB, ordenados por DNI.
 *
 * @param {import("express").Request} req Objeto de petición HTTP.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function obtenerDocentes(req, res) {
    try {
        const docentes = await Docente.find().sort({ dni: 1 })
        return res.json(docentes)
    } catch (error) {
        console.error("Error al obtener docentes:", error)
        return res.status(500).json({
            mensaje: "No se pudo obtener la lista de docentes"
        })
    }
}

/**
 * Busca y devuelve un docente específico según su número de DNI.
 *
 * @param {import("express").Request} req Objeto de petición HTTP con req.params.id.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function obtenerDocente(req, res) {
    try {
        const dni = Number(req.params.id)
        if (!Number.isFinite(dni)) {
            return res.status(400).json({
                mensaje: "El DNI debe ser un número válido"
            })
        }

        const docente = await Docente.findOne({ dni })
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }

        return res.json(docente)
    } catch (error) {
        console.error("Error al obtener docente:", error)
        return res.status(500).json({
            mensaje: "Error interno al buscar el docente"
        })
    }
}

/**
 * Valida los datos del cuerpo de la petición y registra un nuevo docente en MongoDB.
 *
 * @param {import("express").Request} req Objeto de petición HTTP con dni, nombre, especialidad y correo.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function crearDocente(req, res) {
    try {
        const { dni, nombre, especialidad, correo } = req.body

        if (dni === undefined || dni === null || !nombre || !especialidad || !correo) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }

        if (typeof nombre !== "string" || nombre.trim().length < 2) {
            return res.status(400).json({
                mensaje: "El nombre debe ser un texto válido"
            })
        }

        if (typeof dni !== "number" || !Number.isFinite(dni) || dni <= 0) {
            return res.status(400).json({
                mensaje: "El DNI debe ser un número válido mayor a cero"
            })
        }

        const existe = await Docente.findOne({ dni })
        if (existe) {
            return res.status(400).json({
                mensaje: "El DNI ya existe"
            })
        }

        const nuevoDocente = await Docente.create({
            dni,
            nombre: nombre.trim(),
            especialidad: String(especialidad).trim(),
            correo: String(correo).trim().toLowerCase()
        })

        return res.status(201).json(nuevoDocente)
    } catch (error) {
        console.error("Error al crear docente:", error)
        return res.status(500).json({
            mensaje: "No fue posible registrar el docente en la base de datos"
        })
    }
}

/**
 * Actualiza los datos de un docente existente identificado por su DNI.
 *
 * @param {import("express").Request} req Objeto de petición HTTP.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function actualizarDocente(req, res) {
    try {
        const dni = Number(req.params.id)
        if (!Number.isFinite(dni)) {
            return res.status(400).json({
                mensaje: "El DNI proporcionado no es válido"
            })
        }

        const { nombre, especialidad, correo } = req.body
        if (!nombre || !especialidad || !correo) {
            return res.status(400).json({
                mensaje: "Nombre, especialidad y correo son obligatorios para actualizar"
            })
        }

        const docente = await Docente.findOneAndUpdate(
            { dni },
            {
                nombre: String(nombre).trim(),
                especialidad: String(especialidad).trim(),
                correo: String(correo).trim().toLowerCase()
            },
            { returnDocument: "after", runValidators: true }
        )

        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }

        return res.json(docente)
    } catch (error) {
        console.error("Error al actualizar docente:", error)
        return res.status(500).json({
            mensaje: "Error interno al actualizar el docente"
        })
    }
}

/**
 * Elimina un docente de la colección de MongoDB según su número de DNI.
 *
 * @param {import("express").Request} req Objeto de petición HTTP.
 * @param {import("express").Response} res Objeto de respuesta HTTP.
 */
async function eliminarDocente(req, res) {
    try {
        const dni = Number(req.params.id)
        if (!Number.isFinite(dni)) {
            return res.status(400).json({
                mensaje: "El DNI proporcionado no es válido"
            })
        }

        const docente = await Docente.findOneAndDelete({ dni })
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }

        return res.json({ mensaje: "Docente eliminado correctamente" })
    } catch (error) {
        console.error("Error al eliminar docente:", error)
        return res.status(500).json({
            mensaje: "Error interno al eliminar el docente"
        })
    }
}

module.exports = {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}
