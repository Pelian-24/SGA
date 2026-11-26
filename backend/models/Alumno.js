// Importa Mongoose para definir el esquema y el modelo de la colección en MongoDB
const mongoose = require("mongoose")

// Define el esquema de datos y las validaciones para los documentos de la colección "alumnos"
const alumnoSchema = new mongoose.Schema(
    {
        // Número de legajo del alumno: numérico, obligatorio y único
        legajo: {
            type: Number,
            required: true,
            unique: true
        },
        // Nombre completo del alumno: texto obligatorio sin espacios al inicio o al final
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        // Carrera que cursa el alumno: texto obligatorio sin espacios sobrantes
        carrera: {
            type: String,
            required: true,
            trim: true
        },
        // Correo electrónico del alumno: texto obligatorio, limpio y en minúsculas
        correo: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    {
        // Desactiva el campo interno "__v" que Mongoose agrega por defecto
        versionKey: false
    }
)

// Crea el modelo "Alumno" a partir del esquema definido
const Alumno = mongoose.model("Alumno", alumnoSchema)

// Exporta el modelo para utilizarlo en los controladores
module.exports = Alumno
