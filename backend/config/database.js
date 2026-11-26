// Importa Mongoose, la biblioteca puente para trabajar con MongoDB desde Node.js
const mongoose = require("mongoose")

// Función asíncrona que establece la conexión con la base de datos configurada en .env
async function conectarBD() {
    try {
        // Conecta a MongoDB (local o MongoDB Atlas) leyendo la cadena desde process.env.MONGO_URI
        await mongoose.connect(process.env.MONGO_URI)
        // Confirma en consola que la conexión fue exitosa
        console.log("Base de datos conectada")
    } catch (error) {
        // Muestra el error en consola si falla la conexión (ej. IP no autorizada o URI inválida)
        console.log(error)
    }
}

// Exporta la función para ser invocada al iniciar server.js
module.exports = conectarBD
