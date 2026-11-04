/**
 * @copyright 2026 EG Industries. Todos los derechos reservados.
 * @license MIT — Ver archivo LICENSE en la raíz del proyecto.
 *
 * Este archivo es parte de Sistema de Gestión Académica (SGA).
 */

const mongoose = require("mongoose")

// URI por defecto en caso de que la variable de entorno no esté definida
const MONGO_URI_DEFAULT = "mongodb://localhost:27017/basededatos"

/**
 * Establece la conexión asíncrona con la base de datos MongoDB utilizando Mongoose.
 * Si la conexión falla, registra el error técnico en consola y finaliza el proceso
 * de forma controlada para evitar operar sin persistencia.
 *
 * @returns {Promise<void>} Promesa que se resuelve cuando la conexión está activa.
 */
async function conectarBD() {
    try {
        const uri = process.env.MONGO_URI || MONGO_URI_DEFAULT
        const conexion = await mongoose.connect(uri)
        console.info(`Base de datos MongoDB conectada: ${conexion.connection.name} (${conexion.connection.host}:${conexion.connection.port})`)
    } catch (error) {
        console.error("Error crítico al conectar con MongoDB:", error.message)
        process.exit(1)
    }
}

module.exports = conectarBD
