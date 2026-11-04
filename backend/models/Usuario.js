const mongoose = require("mongoose")

// ESQUEMA DE USUARIO: Gestiona las credenciales y roles de acceso en la colección "usuarios"
const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        rol: {
            type: String,
            enum: ["admin", "usuario"],
            default: "usuario"
        }
    },
    {
        versionKey: false
    }
)

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = Usuario
