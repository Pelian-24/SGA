const Materia = require("../models/Materia")

const ESTADOS_PERMITIDOS = ["activa", "inactiva"]

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find()
        return res.json(materias)
    } catch (error) {
        console.error("Error al obtener materias:", error)
        return res.status(500).json({
            mensaje: "No se pudo obtener la lista de materias"
        })
    }
}

async function obtenerMateria(req, res) {
    try {
        const codigo = String(req.params.codigo || "").trim()
        if (!codigo) {
            return res.status(400).json({
                mensaje: "El código de la materia es obligatorio"
            })
        }

        const materia = await Materia.findOne({ codigo })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        return res.json(materia)
    } catch (error) {
        console.error("Error al obtener materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al consultar la materia"
        })
    }
}

async function crearMateria(req, res) {
    try {
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body

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

        if (typeof codigo !== "string" || codigo.trim() === "") {
            return res.status(400).json({
                mensaje: "El código es obligatorio y no puede contener únicamente espacios"
            })
        }

        if (typeof nombre !== "string" || nombre.trim() === "") {
            return res.status(400).json({
                mensaje: "El nombre es obligatorio y no puede contener únicamente espacios"
            })
        }

        if (nombre.trim().length < 3) {
            return res.status(400).json({
                mensaje: "El nombre debe tener al menos 3 caracteres"
            })
        }

        if (descripcion !== undefined && descripcion !== null && descripcion !== "") {
            if (typeof descripcion !== "string" || descripcion.trim() === "") {
                return res.status(400).json({
                    mensaje: "La descripción no puede contener únicamente espacios"
                })
            }
        }

        if (typeof cargaHoraria !== "number" || !Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
            return res.status(400).json({
                mensaje: "La carga horaria debe ser un número entero mayor que cero"
            })
        }

        if (typeof estado !== "string" || !ESTADOS_PERMITIDOS.includes(estado.trim())) {
            return res.status(400).json({
                mensaje: "El estado solo admite los valores activa o inactiva"
            })
        }

        const codigoNormalizado = codigo.trim()
        const existe = await Materia.findOne({ codigo: codigoNormalizado })
        if (existe) {
            return res.status(400).json({
                mensaje: "El código de la materia ya existe"
            })
        }

        const nuevaMateria = await Materia.create({
            codigo: codigoNormalizado,
            nombre: nombre.trim(),
            descripcion: descripcion ? descripcion.trim() : "",
            cargaHoraria,
            estado: estado.trim()
        })

        return res.status(201).json(nuevaMateria)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El código de la materia ya existe"
            })
        }
        console.error("Error al crear materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al registrar la materia"
        })
    }
}

async function actualizarMateria(req, res) {
    try {
        const codigoParam = String(req.params.codigo || "").trim()
        if (!codigoParam) {
            return res.status(400).json({
                mensaje: "El código de la materia es obligatorio"
            })
        }

        const materiaExistente = await Materia.findOne({ codigo: codigoParam })
        if (!materiaExistente) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
        const datosActualizados = {}

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

        if (cargaHoraria !== undefined) {
            if (typeof cargaHoraria !== "number" || !Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
                return res.status(400).json({
                    mensaje: "La carga horaria debe ser un número entero mayor que cero"
                })
            }
            datosActualizados.cargaHoraria = cargaHoraria
        }

        if (estado !== undefined) {
            if (typeof estado !== "string" || !ESTADOS_PERMITIDOS.includes(estado.trim())) {
                return res.status(400).json({
                    mensaje: "El estado solo admite los valores activa o inactiva"
                })
            }
            datosActualizados.estado = estado.trim()
        }

        if (Object.keys(datosActualizados).length === 0) {
            return res.status(400).json({
                mensaje: "Debés enviar al menos un campo para modificar"
            })
        }

        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo: codigoParam },
            datosActualizados,
            { returnDocument: "after", runValidators: true }
        )

        return res.json(materiaActualizada)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El código ya pertenece a otra materia registrada"
            })
        }
        console.error("Error al actualizar materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al modificar la materia"
        })
    }
}

async function eliminarMateria(req, res) {
    try {
        const codigo = String(req.params.codigo || "").trim()
        if (!codigo) {
            return res.status(400).json({
                mensaje: "El código de la materia es obligatorio"
            })
        }

        const materiaEliminada = await Materia.findOneAndDelete({ codigo })
        if (!materiaEliminada) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        return res.json({
            mensaje: "Materia eliminada correctamente"
        })
    } catch (error) {
        console.error("Error al eliminar materia:", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor al eliminar la materia"
        })
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}
