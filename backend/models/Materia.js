// Importa Mongoose para definir el esquema y el modelo de la colección en MongoDB
const mongoose = require("mongoose")

// Define el esquema de datos y validaciones para los documentos de la colección "materias"
const materiaSchema = new mongoose.Schema(
    {
        // Código identificador de la materia: texto obligatorio, único y sin espacios laterales
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // Nombre de la materia: texto obligatorio con al menos 3 caracteres
        nombre: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        // Descripción opcional de la materia: no permite cadenas compuestas solo por espacios
        descripcion: {
            type: String,
            default: "",
            validate: {
                // Valida que esté vacía o contenga al menos un carácter visible
                validator: function (valor) {
                    return valor === undefined || valor === null || valor === "" || valor.trim().length > 0
                },
                // Mensaje devuelto si la validación falla
                message: "La descripción no puede contener únicamente espacios"
            }
        },
        // Carga horaria de la materia: número entero obligatorio mayor o igual a 1
        cargaHoraria: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                // Comprueba que el valor ingresado sea un número entero
                validator: Number.isInteger,
                // Mensaje devuelto si el valor tiene decimales o no es entero
                message: "La carga horaria debe ser un número entero mayor que cero"
            }
        },
        // Estado de la materia: solo admite "activa" o "inactiva"
        estado: {
            type: String,
            required: true,
            enum: ["activa", "inactiva"]
        }
    },
    {
        // Desactiva el campo interno "__v" que Mongoose agrega por defecto
        versionKey: false
    }
)

// Crea el modelo "Materia" a partir del esquema definido
const Materia = mongoose.model("Materia", materiaSchema)

// Exporta el modelo para utilizarlo en los controladores
module.exports = Materia
