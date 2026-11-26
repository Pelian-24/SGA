// Importa el modelo Alumno para interactuar con la colección "alumnos" en MongoDB
const Alumno = require("../models/Alumno")

// Devuelve el listado completo de alumnos ordenados de forma ascendente por legajo
async function obtenerAlumnos(req, res) {
    try {
        // Consulta todos los documentos y los ordena por legajo ascendente
        const alumnos = await Alumno.find().sort({ legajo: 1 })
        // Responde con el arreglo de alumnos en formato JSON
        return res.json(alumnos)
    } catch (error) {
        // Registra el fallo en servidor y responde con código 500
        console.error("Error al obtener alumnos:", error)
        return res.status(500).json({
            mensaje: "No se pudo obtener la lista de alumnos"
        })
    }
}

// Busca y devuelve un alumno específico utilizando el legajo recibido en la URL
async function obtenerAlumno(req, res) {
    try {
        // Convierte el parámetro de ruta "id" a número para buscar por legajo
        const legajo = Number(req.params.id)
        // Rechaza la petición si el legajo no es un número válido
        if (!Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo debe ser un número válido"
            })
        }

        // Busca un documento que coincida con el legajo indicado
        const alumno = await Alumno.findOne({ legajo })
        // Si no existe ningún registro con ese legajo, devuelve 404
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            })
        }

        // Devuelve el documento del alumno encontrado
        return res.json(alumno)
    } catch (error) {
        // Registra el fallo inesperado y responde con error 500
        console.error("Error al obtener alumno:", error)
        return res.status(500).json({
            mensaje: "Error interno al buscar el alumno"
        })
    }
}

// Valida los datos enviados en el body y crea un nuevo alumno en MongoDB
async function crearAlumno(req, res) {
    try {
        // Extrae los campos del cuerpo de la solicitud
        const { legajo, nombre, carrera, correo } = req.body

        // Verifica que estén presentes todos los campos obligatorios
        if (legajo === undefined || legajo === null || !nombre || !carrera || !correo) {
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

        // Comprueba que el legajo sea un número válido mayor a cero
        if (typeof legajo !== "number" || !Number.isFinite(legajo) || legajo <= 0) {
            return res.status(400).json({
                mensaje: "El legajo debe ser un número válido mayor a cero"
            })
        }

        // Verifica que no exista otro alumno registrado con el mismo legajo
        const existe = await Alumno.findOne({ legajo })
        if (existe) {
            return res.status(400).json({
                mensaje: "El legajo ya existe"
            })
        }

        // Inserta el nuevo alumno normalizando espacios y minúsculas en el correo
        const nuevoAlumno = await Alumno.create({
            legajo,
            nombre: nombre.trim(),
            carrera: String(carrera).trim(),
            correo: String(correo).trim().toLowerCase()
        })

        // Devuelve código 201 (Created) junto con el documento creado
        return res.status(201).json(nuevoAlumno)
    } catch (error) {
        // Registra el error y responde con código 500 si falló el guardado
        console.error("Error al crear alumno:", error)
        return res.status(500).json({
            mensaje: "No fue posible registrar el alumno en la base de datos"
        })
    }
}

// Actualiza nombre, carrera y correo de un alumno existente buscado por su legajo
async function actualizarAlumno(req, res) {
    try {
        // Convierte el parámetro de ruta "id" a número
        const legajo = Number(req.params.id)
        // Verifica que el legajo recibido sea numérico
        if (!Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo proporcionado no es válido"
            })
        }

        // Extrae los campos editables desde el cuerpo de la petición
        const { nombre, carrera, correo } = req.body
        // Comprueba que no falte ninguno de los campos requeridos
        if (!nombre || !carrera || !correo) {
            return res.status(400).json({
                mensaje: "Nombre, carrera y correo son obligatorios para actualizar"
            })
        }

        // Busca el alumno por legajo, actualiza los campos y devuelve el documento actualizado
        const alumno = await Alumno.findOneAndUpdate(
            { legajo },
            {
                nombre: String(nombre).trim(),
                carrera: String(carrera).trim(),
                correo: String(correo).trim().toLowerCase()
            },
            { returnDocument: "after", runValidators: true }
        )

        // Si no se encontró un alumno con ese legajo, responde con 404
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            })
        }

        // Devuelve el documento del alumno ya modificado
        return res.json(alumno)
    } catch (error) {
        // Registra el error inesperado y responde con código 500
        console.error("Error al actualizar alumno:", error)
        return res.status(500).json({
            mensaje: "Error interno al actualizar el alumno"
        })
    }
}

// Elimina un alumno de la colección utilizando su legajo
async function eliminarAlumno(req, res) {
    try {
        // Convierte el parámetro "id" a número
        const legajo = Number(req.params.id)
        // Valida que el legajo recibido sea un número válido
        if (!Number.isFinite(legajo)) {
            return res.status(400).json({
                mensaje: "El legajo proporcionado no es válido"
            })
        }

        // Busca y elimina el documento que coincide con el legajo
        const alumno = await Alumno.findOneAndDelete({ legajo })
        // Si no existía ese legajo, devuelve código 404
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            })
        }

        // Confirma la eliminación exitosa al cliente
        return res.json({ mensaje: "Alumno eliminado correctamente" })
    } catch (error) {
        // Registra el fallo y responde con error interno 500
        console.error("Error al eliminar alumno:", error)
        return res.status(500).json({
            mensaje: "Error interno al eliminar el alumno"
        })
    }
}

// Exporta todas las operaciones del controlador de alumnos
module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}
