// Importa Mongoose para definir el esquema y el modelo de la colección en MongoDB
const mongoose = require("mongoose")

// Define el esquema de datos y las validaciones para los documentos de la colección "docentes"
const docenteSchema = new mongoose.Schema(
    {
        // DNI del docente: numérico, obligatorio y único
        dni: {
            type: Number,
            required: true,
            unique: true
        },
        // Nombre completo del docente: texto obligatorio sin espacios al inicio o al final
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        // Especialidad o área del docente: texto obligatorio sin espacios sobrantes
        especialidad: {
            type: String,
            required: true,
            trim: true
        },
        // Correo electrónico del docente: texto obligatorio, limpio y en minúsculas
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

// Crea el modelo "Docente" a partir del esquema definido
const Docente = mongoose.model("Docente", docenteSchema)

// Exporta el modelo para utilizarlo en los controladores
module.exports = Docente
