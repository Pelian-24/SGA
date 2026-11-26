// Importa Mongoose para definir el esquema y el modelo de la colección en MongoDB
const mongoose = require("mongoose")

// Define el esquema de datos para los usuarios del sistema en la colección "usuarios"
const usuarioSchema = new mongoose.Schema(
    {
        // Nombre completo del usuario: texto obligatorio sin espacios sobrantes
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        // Correo de acceso: obligatorio, único, en minúsculas y sin espacios laterales
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        // Contraseña hasheada con bcrypt: oculta por defecto en las consultas normales
        password: {
            type: String,
            required: true,
            select: false
        },
        // Rol del usuario para controlar permisos: "admin" o "usuario" (por defecto)
        rol: {
            type: String,
            enum: ["admin", "usuario"],
            default: "usuario"
        }
    },
    {
        // Desactiva el campo interno "__v" que Mongoose agrega por defecto
        versionKey: false
    }
)

// Crea el modelo "Usuario" a partir del esquema definido
const Usuario = mongoose.model("Usuario", usuarioSchema)

// Exporta el modelo para utilizarlo en autenticación y scripts de alta
module.exports = Usuario
