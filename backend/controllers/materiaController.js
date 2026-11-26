// Importa el modelo Materia para operar sobre la colección "materias" en MongoDB
const Materia = require("../models/Materia")

// Lista de estados válidos admitidos por las reglas del módulo Materias
const ESTADOS_PERMITIDOS = ["activa", "inactiva"]

// Devuelve el listado completo de materias registradas en la base de datos
async function obtenerMaterias(req, res) {
    try {
        // Consulta todas las materias almacenadas en MongoDB
        const materias = await Materia.find()
        // Devuelve el arreglo de materias en formato JSON
        return res.json(materias)
    } catch (error) {
        // Registra el fallo y devuelve código 500
        console.error("Error al obtener materias:", error)
        return res.status(500).json({
            mensaje: "No se pudo obtener la lista de materias"
        })
    }
}

// Busca y devuelve una materia específica utilizando su código identificador
async function obtenerMateria(req, res) {
    try {
        // Obtiene y limpia el parámetro "codigo" recibido en la URL
        const codigo = String(req.params.codigo || "").trim()
        // Valida que el código no esté vacío
        if (!codigo) {
            return res.status(400).json({
                mensaje: "El código de la materia es obligatorio"
            })
        }

        // Busca la materia cuyo código coincida con el parámetro recibido
        const materia = await Materia.findOne({ codigo })
        // Si no existe ninguna materia con ese código, responde con 404
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        // Devuelve los datos de la materia encontrada
        return res.json(materia)
    } catch (error) {
        // Registra el fallo inesperado y responde con código 500
        console.error("Error al obtener materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al consultar la materia"
        })
    }
}

// Valida todos los campos obligatorios y reglas de negocio antes de registrar una nueva materia
async function crearMateria(req, res) {
    try {
        // Extrae los campos del cuerpo de la solicitud
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body

        // Verifica que estén presentes todos los campos requeridos
        if (
            codigo === undefined || codigo === null ||
            nombre === undefined || nombre === null ||
            cargaHoraria === undefined || cargaHoraria === null || cargaHoraria === "" ||
            estado === undefined || estado === null
        ) {
            return res.status(400).json({
                mensaje: "Los campos código, nombre, carga horaria y estado son obligatorios"
            })
        }

        // Valida que el código sea un texto no vacío
        if (typeof codigo !== "string" || codigo.trim() === "") {
            return res.status(400).json({
                mensaje: "El código es obligatorio y no puede contener únicamente espacios"
            })
        }

        // Valida que el nombre sea un texto no vacío
        if (typeof nombre !== "string" || nombre.trim() === "") {
            return res.status(400).json({
                mensaje: "El nombre es obligatorio y no puede contener únicamente espacios"
            })
        }

        // Exige una longitud mínima de 3 caracteres para el nombre
        if (nombre.trim().length < 3) {
            return res.status(400).json({
                mensaje: "El nombre debe tener al menos 3 caracteres"
            })
        }

        // Si se envió descripción, valida que no sea un texto compuesto solo por espacios
        if (descripcion !== undefined && descripcion !== null && descripcion !== "") {
            if (typeof descripcion !== "string" || descripcion.trim() === "") {
                return res.status(400).json({
                    mensaje: "La descripción no puede contener únicamente espacios"
                })
            }
        }

        // Valida que la carga horaria sea un número entero positivo
        if (typeof cargaHoraria !== "number" || !Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
            return res.status(400).json({
                mensaje: "La carga horaria debe ser un número entero mayor que cero"
            })
        }

        // Valida que el estado pertenezca a la lista de valores permitidos
        if (typeof estado !== "string" || !ESTADOS_PERMITIDOS.includes(estado.trim())) {
            return res.status(400).json({
                mensaje: "El estado solo admite los valores activa o inactiva"
            })
        }

        // Limpia espacios del código y verifica que no esté duplicado en la colección
        const codigoNormalizado = codigo.trim()
        const existe = await Materia.findOne({ codigo: codigoNormalizado })
        if (existe) {
            return res.status(400).json({
                mensaje: "El código de la materia ya existe"
            })
        }

        // Guarda la nueva materia normalizando espacios en los campos de texto
        const nuevaMateria = await Materia.create({
            codigo: codigoNormalizado,
            nombre: nombre.trim(),
            descripcion: descripcion ? descripcion.trim() : "",
            cargaHoraria,
            estado: estado.trim()
        })

        // Responde con código 201 (Created) y el documento creado
        return res.status(201).json(nuevaMateria)
    } catch (error) {
        // Maneja el error de índice único de MongoDB en caso de código repetido
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El código de la materia ya existe"
            })
        }
        // Registra cualquier otro fallo inesperado y responde con código 500
        console.error("Error al crear materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al registrar la materia"
        })
    }
}

// Modifica uno o más campos de una materia existente identificada por su código
async function actualizarMateria(req, res) {
    try {
        // Obtiene y limpia el código original enviado en el parámetro de ruta
        const codigoParam = String(req.params.codigo || "").trim()
        if (!codigoParam) {
            return res.status(400).json({
                mensaje: "El código de la materia es obligatorio"
            })
        }

        // Verifica que la materia exista antes de aplicar cambios
        const materiaExistente = await Materia.findOne({ codigo: codigoParam })
        if (!materiaExistente) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        // Extrae los campos recibidos y prepara el objeto con los valores a actualizar
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
        const datosActualizados = {}

        // Si se envía un nuevo código, valida que sea texto no vacío y que no pertenezca a otra materia
        if (codigo !== undefined) {
            if (typeof codigo !== "string" || codigo.trim() === "") {
                return res.status(400).json({
                    mensaje: "El código debe ser un texto válido y no estar vacío"
                })
            }
            const nuevoCodigo = codigo.trim()
            if (nuevoCodigo !== codigoParam) {
                const codigoDuplicado = await Materia.findOne({ codigo: nuevoCodigo })
                if (codigoDuplicado) {
                    return res.status(400).json({
                        mensaje: "El código ya pertenece a otra materia registrada"
                    })
                }
            }
            datosActualizados.codigo = nuevoCodigo
        }

        // Si se envía nombre, valida que tenga al menos 3 caracteres visibles
        if (nombre !== undefined) {
            if (typeof nombre !== "string" || nombre.trim() === "") {
                return res.status(400).json({
                    mensaje: "El nombre no puede estar vacío ni contener únicamente espacios"
                })
            }
            if (nombre.trim().length < 3) {
                return res.status(400).json({
                    mensaje: "El nombre debe tener al menos 3 caracteres"
                })
            }
            datosActualizados.nombre = nombre.trim()
        }

        // Si se envía descripción, permite limpiarla o valida que no sea solo espacios
        if (descripcion !== undefined) {
            if (descripcion === null || descripcion === "") {
                datosActualizados.descripcion = ""
            } else if (typeof descripcion !== "string" || descripcion.trim() === "") {
                return res.status(400).json({
                    mensaje: "La descripción no puede contener únicamente espacios"
                })
            } else {
                datosActualizados.descripcion = descripcion.trim()
            }
        }

        // Si se envía carga horaria, valida que sea un número entero positivo
        if (cargaHoraria !== undefined) {
            if (typeof cargaHoraria !== "number" || !Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
                return res.status(400).json({
                    mensaje: "La carga horaria debe ser un número entero mayor que cero"
                })
            }
            datosActualizados.cargaHoraria = cargaHoraria
        }

        // Si se envía estado, valida que sea "activa" o "inactiva"
        if (estado !== undefined) {
            if (typeof estado !== "string" || !ESTADOS_PERMITIDOS.includes(estado.trim())) {
                return res.status(400).json({
                    mensaje: "El estado solo admite los valores activa o inactiva"
                })
            }
            datosActualizados.estado = estado.trim()
        }

        // Rechaza la actualización si el cuerpo no incluyó ningún campo editable
        if (Object.keys(datosActualizados).length === 0) {
            return res.status(400).json({
                mensaje: "Debés enviar al menos un campo para modificar"
            })
        }

        // Aplica la actualización en MongoDB ejecutando validadores del esquema y devuelve el resultado
        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo: codigoParam },
            datosActualizados,
            { returnDocument: "after", runValidators: true }
        )

        // Devuelve el documento de la materia actualizada
        return res.json(materiaActualizada)
    } catch (error) {
        // Maneja un posible choque de clave única al modificar el código
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El código ya pertenece a otra materia registrada"
            })
        }
        // Registra el fallo inesperado y responde con código 500
        console.error("Error al actualizar materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al modificar la materia"
        })
    }
}

// Elimina una materia de MongoDB utilizando su código identificador
async function eliminarMateria(req, res) {
    try {
        // Obtiene y limpia el parámetro "codigo" recibido en la URL
        const codigo = String(req.params.codigo || "").trim()
        if (!codigo) {
            return res.status(400).json({
                mensaje: "El código de la materia es obligatorio"
            })
        }

        // Busca y elimina el documento que coincide con el código indicado
        const materiaEliminada = await Materia.findOneAndDelete({ codigo })
        // Si no se encontró ninguna materia con ese código, responde con 404
        if (!materiaEliminada) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        // Confirma la eliminación al cliente
        return res.json({
            mensaje: "Materia eliminada correctamente"
        })
    } catch (error) {
        // Registra el error inesperado y responde con código 500
        console.error("Error al eliminar materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al eliminar la materia"
        })
    }
}

// Exporta todas las operaciones del controlador de materias
module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}
