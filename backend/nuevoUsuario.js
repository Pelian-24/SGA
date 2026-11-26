// Importa path para ubicar el archivo backend/.env desde cualquier directorio de ejecución
const path = require("path")
// Importa Mongoose para conectarse a la base de datos MongoDB (local o Atlas)
const mongoose = require("mongoose")
// Importa bcrypt para encriptar la contraseña antes de almacenarla
const bcrypt = require("bcrypt")
// Carga las variables de entorno definidas en backend/.env
require("dotenv").config({ path: path.join(__dirname, ".env") })

// Importa el modelo Usuario para crear o actualizar el usuario de consulta
const Usuario = require("./models/Usuario")

// Script auxiliar que crea (o actualiza si ya existe) un usuario con rol "usuario" (solo consulta)
async function nuevoUsuario() {
    try {
        // Conecta a MongoDB usando la URI definida en .env
        await mongoose.connect(process.env.MONGO_URI)

        // Define las credenciales ficticias del usuario de solo lectura
        const email = "consulta@sga.com"
        const password = "claveUsuario123"

        // Genera el hash seguro de la contraseña con 10 rondas de sal
        const hash = await bcrypt.hash(password, 10)

        // Crea el usuario de consulta o actualiza su contraseña/datos si el correo ya existía
        await Usuario.findOneAndUpdate(
            { email },
            {
                nombre: "Usuario de consulta",
                email,
                password: hash,
                rol: "usuario"
            },
            { upsert: true, returnDocument: "after" }
        )

        // Informa por consola el resultado de la operación
        console.log("Usuario de consulta creado/actualizado correctamente")
        console.log("Email:", email)
    } catch (error) {
        // Muestra el detalle si ocurrió un error de conexión o guardado y marca código de fallo
        console.error("Error al crear el usuario de consulta:", error.message)
        process.exitCode = 1
    } finally {
        // Cierra siempre la conexión con MongoDB para finalizar el proceso
        await mongoose.disconnect()
    }
}

// Ejecuta la función al correr el script con Node
nuevoUsuario()
