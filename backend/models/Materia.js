const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    descripcion: {
        type: String,
        default: "",
        validate: {
            validator: function (valor) {
                return valor === undefined || valor === null || valor === "" || valor.trim().length > 0
            },
            message: "La descripción no puede contener únicamente espacios"
        }
    },
    cargaHoraria: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "La carga horaria debe ser un número entero mayor que cero"
        }
    },
    estado: {
        type: String,
        required: true,
        enum: ["activa", "inactiva"]
    }
}, {
    versionKey: false
})

const Materia = mongoose.model("Materia", materiaSchema)

module.exports = Materia
