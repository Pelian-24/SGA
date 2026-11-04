const mongoose = require("mongoose")

// ESQUEMA DE ALUMNO: Define la estructura y validaciones de los documentos en la colección "alumnos"
const alumnoSchema = new mongoose.Schema(
    {
        legajo: {
            type: Number,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        carrera: {
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

const Alumno = mongoose.model("Alumno", alumnoSchema)

module.exports = Alumno
