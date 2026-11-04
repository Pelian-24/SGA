const path = require("path")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const Usuario = require("./models/Usuario")
const Alumno = require("./models/Alumno")
const Docente = require("./models/Docente")

/**
 * Inicializa la base de datos MongoDB ("basededatos") creando el usuario administrador de prueba
 * y poblando datos iniciales en las colecciones "alumnos" y "docentes" si se encuentran vacías.
 */
async function crearUsuario() {
    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/basededatos"
        await mongoose.connect(uri)

        // 1. Limpieza de colección huérfana "maestros" si está vacía (Mongoose utiliza "docentes")
        const colecciones = await mongoose.connection.db.listCollections({ name: "maestros" }).toArray()
        if (colecciones.length > 0) {
            const cantidadMaestros = await mongoose.connection.db.collection("maestros").countDocuments()
            if (cantidadMaestros === 0) {
                await mongoose.connection.db.dropCollection("maestros")
                console.info("Colección vacía 'maestros' reemplazada por el estándar 'docentes'.")
            }
        }

        // 2. Creación o actualización idempotente del usuario administrador de prueba
        const email = "admin@sga.com"
        const password = "ClaveDePrueba123!"
        const hash = await bcrypt.hash(password, 10)

        await Usuario.findOneAndUpdate(
            { email },
            {
                nombre: "Administrador de prueba",
                email,
                password: hash,
                rol: "admin"
            },
            { upsert: true, returnDocument: "after" }
        )

        console.info("Usuario de prueba listo en colección 'usuarios':", email)

        // 3. Carga de alumnos iniciales de ejemplo si la colección está vacía
        const totalAlumnos = await Alumno.countDocuments()
        if (totalAlumnos === 0) {
            await Alumno.insertMany([
                {
                    legajo: 1001,
                    nombre: "Ana Martínez",
                    carrera: "Tecnicatura Universitaria en Programación",
                    correo: "ana.martinez@sga.edu.ar"
                },
                {
                    legajo: 1002,
                    nombre: "Juan Carlos Gómez",
                    carrera: "Ingeniería en Sistemas",
                    correo: "juan.gomez@sga.edu.ar"
                },
                {
                    legajo: 1023,
                    nombre: "Ramón Díaz",
                    carrera: "Tecnicatura Universitaria en Programación",
                    correo: "ramon.diaz@sga.edu.ar"
                }
            ])
            console.info("Colección 'alumnos' inicializada con 3 registros de ejemplo.")
        }

        // 4. Carga de docentes iniciales de ejemplo si la colección está vacía
        const totalDocentes = await Docente.countDocuments()
        if (totalDocentes === 0) {
            await Docente.insertMany([
                {
                    dni: 30111222,
                    nombre: "Irina Silva",
                    especialidad: "Programación IV",
                    correo: "irina.silva@sga.edu.ar"
                },
                {
                    dni: 28444555,
                    nombre: "Rocío Fernández",
                    especialidad: "Bases de Datos",
                    correo: "rocio.fernandez@sga.edu.ar"
                }
            ])
            console.info("Colección 'docentes' inicializada con 2 registros de ejemplo.")
        }
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error.message)
    } finally {
        await mongoose.disconnect()
    }
}

crearUsuario()
