// Importa el modelo Docente para interactuar con la colección "docentes" en MongoDB
const Docente = require("../models/Docente")

// Devuelve el listado completo de docentes ordenados de forma ascendente por DNI
async function obtenerDocentes(req, res) {
    try {
        // Consulta todos los docentes y los ordena por DNI ascendente
        const docentes = await Docente.find().sort({ dni: 1 })
        // Responde con el arreglo de docentes en formato JSON
        return res.json(docentes)
    } catch (error) {
        // Registra el fallo en servidor y responde con código 500
        console.error("Error al obtener docentes:", error)
        return res.status(500).json({
            mensaje: "No se pudo obtener la lista de docentes"
        })
    }
}

// Busca y devuelve un docente específico utilizando el DNI recibido en la URL
async function obtenerDocente(req, res) {
    try {
        // Convierte el parámetro de ruta "id" a número para buscar por DNI
        const dni = Number(req.params.id)
        // Rechaza la petición si el DNI no es un número válido
        if (!Number.isFinite(dni)) {
            return res.status(400).json({
                mensaje: "El DNI debe ser un número válido"
            })
        }

        // Busca un documento que coincida con el DNI indicado
        const docente = await Docente.findOne({ dni })
        // Si no existe ningún registro con ese DNI, devuelve 404
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }

        // Devuelve el documento del docente encontrado
        return res.json(docente)
    } catch (error) {
        // Registra el fallo inesperado y responde con error 500
        console.error("Error al obtener docente:", error)
        return res.status(500).json({
            mensaje: "Error interno al buscar el docente"
        })
    }
}

// Valida los datos enviados en el body y crea un nuevo docente en MongoDB
async function crearDocente(req, res) {
    try {
        // Extrae los campos del cuerpo de la solicitud
        const { dni, nombre, especialidad, correo } = req.body

        // Verifica que estén presentes todos los campos obligatorios
        if (dni === undefined || dni === null || !nombre || !especialidad || !correo) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }

        // Comprueba que el nombre sea un texto de al menos 2 caracteres
        if (typeof nombre !== "string" || nombre.trim().length < 2) {
            return res.status(400).json({
                mensaje: "El nombre debe ser un texto válido"
            })
        }

        // Comprueba que el DNI sea un número válido mayor a cero
        if (typeof dni !== "number" || !Number.isFinite(dni) || dni <= 0) {
            return res.status(400).json({
                mensaje: "El DNI debe ser un número válido mayor a cero"
            })
        }

        // Verifica que no exista otro docente registrado con el mismo DNI
        const existe = await Docente.findOne({ dni })
        if (existe) {
            return res.status(400).json({
                mensaje: "El DNI ya existe"
            })
        }

        // Inserta el nuevo docente normalizando espacios y minúsculas en el correo
        const nuevoDocente = await Docente.create({
            dni,
            nombre: nombre.trim(),
            especialidad: String(especialidad).trim(),
            correo: String(correo).trim().toLowerCase()
        })

        // Devuelve código 201 (Created) junto con el documento creado
        return res.status(201).json(nuevoDocente)
    } catch (error) {
        // Registra el error y responde con código 500 si falló el guardado
        console.error("Error al crear docente:", error)
        return res.status(500).json({
            mensaje: "No fue posible registrar el docente en la base de datos"
        })
    }
}

// Actualiza nombre, especialidad y correo de un docente existente buscado por su DNI
async function actualizarDocente(req, res) {
    try {
        // Convierte el parámetro de ruta "id" a número
        const dni = Number(req.params.id)
        // Verifica que el DNI recibido sea numérico
        if (!Number.isFinite(dni)) {
            return res.status(400).json({
                mensaje: "El DNI proporcionado no es válido"
            })
        }

        // Extrae los campos editables desde el cuerpo de la petición
        const { nombre, especialidad, correo } = req.body
        // Comprueba que no falte ninguno de los campos requeridos
        if (!nombre || !especialidad || !correo) {
            return res.status(400).json({
                mensaje: "Nombre, especialidad y correo son obligatorios para actualizar"
            })
        }

        // Busca el docente por DNI, actualiza los campos y devuelve el documento actualizado
        const docente = await Docente.findOneAndUpdate(
            { dni },
            {
                nombre: String(nombre).trim(),
                especialidad: String(especialidad).trim(),
                correo: String(correo).trim().toLowerCase()
            },
            { returnDocument: "after", runValidators: true }
        )

        // Si no se encontró un docente con ese DNI, responde con 404
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }

        // Devuelve el documento del docente ya modificado
        return res.json(docente)
    } catch (error) {
        // Registra el error inesperado y responde con código 500
        console.error("Error al actualizar docente:", error)
        return res.status(500).json({
            mensaje: "Error interno al actualizar el docente"
        })
    }
}

// Elimina un docente de la colección utilizando su DNI
async function eliminarDocente(req, res) {
    try {
        // Convierte el parámetro "id" a número
        const dni = Number(req.params.id)
        // Valida que el DNI recibido sea un número válido
        if (!Number.isFinite(dni)) {
            return res.status(400).json({
                mensaje: "El DNI proporcionado no es válido"
            })
        }

        // Busca y elimina el documento que coincide con el DNI
        const docente = await Docente.findOneAndDelete({ dni })
        // Si no existía ese DNI, devuelve código 404
        if (!docente) {
            return res.status(404).json({
                mensaje: "Docente no encontrado"
            })
        }

        // Confirma la eliminación exitosa al cliente
        return res.json({ mensaje: "Docente eliminado correctamente" })
    } catch (error) {
        // Registra el fallo y responde con error interno 500
        console.error("Error al eliminar docente:", error)
        return res.status(500).json({
            mensaje: "Error interno al eliminar el docente"
        })
    }
}

// Exporta todas las operaciones del controlador de docentes
module.exports = {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}
