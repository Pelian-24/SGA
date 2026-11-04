const path = require("path")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const Usuario = require("./models/Usuario")
const Alumno = require("./models/Alumno")
const Docente = require("./models/Docente")
const Materia = require("./models/Materia")

async function crearUsuario() {
    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/basededatos"
        await mongoose.connect(uri)

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
        }

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
        }

        const totalMaterias = await Materia.countDocuments()
        if (totalMaterias === 0) {
            await Materia.insertMany([
                {
                    codigo: "PRG1",
                    nombre: "Programación I",
                    descripcion: "Fundamentos de algoritmos y lógica de programación",
                    cargaHoraria: 64,
                    estado: "activa"
                },
                {
                    codigo: "PRG3",
                    nombre: "Programación III",
                    descripcion: "Desarrollo web frontend y asincronía",
                    cargaHoraria: 96,
                    estado: "activa"
                },
                {
                    codigo: "PRG4",
                    nombre: "Programación IV",
                    descripcion: "Desarrollo full-stack con React, Express y MongoDB",
                    cargaHoraria: 96,
                    estado: "activa"
                },
                {
                    codigo: "BD1",
                    nombre: "Bases de Datos I",
                    descripcion: "Modelado de datos relacional y NoSQL",
                    cargaHoraria: 64,
                    estado: "activa"
                }
            ])
        }

        console.log("Datos iniciales verificados correctamente en MongoDB")
    } catch (error) {
        console.error("Error al inicializar datos:", error.message)
    } finally {
        await mongoose.disconnect()
    }
}

crearUsuario()
