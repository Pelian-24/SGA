const mongoose = require("mongoose")

// ESQUEMA DE DOCENTE: Define la estructura y validaciones de los documentos en la colección "docentes"
const docenteSchema = new mongoose.Schema(
    {
        dni: {
            type: Number,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        especialidad: {
            type: String,
            required: true,
            trim: true
        },
        correo: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    {
        versionKey: false
    }
)

const Docente = mongoose.model("Docente", docenteSchema)

module.exports = Docente
