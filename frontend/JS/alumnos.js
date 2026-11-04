const formulario = document.querySelector("#formulario")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoLegajo = null
let alumnoEditar = null
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"
const btnGuardar = document.querySelector("#btnGuardar")
const API_ALUMNOS = "http://localhost:3000/alumnos"

// MANEJO DE ENVÍO DEL FORMULARIO: Crea un alumno nuevo (POST) o actualiza uno existente (PUT) en MongoDB
formulario.addEventListener("submit", async function (event) {
    event.preventDefault()

    const legajo = document.querySelector("#legajo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (legajo === "" || nombre === "" || carrera === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    try {
        if (alumnoEditandoLegajo === null) {
            const alumno = {
                legajo: Number(legajo),
                nombre,
                carrera,
                correo
            }
            const respuesta = await fetch(API_ALUMNOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(alumno)
            })
            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}))
                throw new Error(errorData.mensaje || "La API respondió con un error.")
            }
            mostrarMensaje("Alumno guardado correctamente", "mje-exito")
        } else {
            const datosActuales = {
                nombre,
                carrera,
                correo
            }
            if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)) {
                mostrarMensaje("No se realizaron cambios", "mje-adv")
                return
            }
            const respuesta = await fetch(`${API_ALUMNOS}/${alumnoEditandoLegajo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosActuales)
            })
            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}))
                throw new Error(errorData.mensaje || "La API respondió con un error.")
            }
            alumnoEditandoLegajo = null
            alumnoEditar = null
            btnGuardar.textContent = "Guardar Alumno"
            btnCancelar.style.display = "none"
            document.querySelector("#legajo").disabled = false

            mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
        }
        await actualizarListaAlumnos()
        formulario.reset()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje(error.message || "No fue posible realizar la operación", "mje-error")
    }
})

/**
 * Consulta la API REST para obtener todos los alumnos almacenados en MongoDB.
 *
 * @returns {Promise<Array>} Arreglo de objetos alumno.
 */
async function obtenerAlumnos() {
    try {
        const respuesta = await fetch(API_ALUMNOS)
        if (!respuesta.ok) {
            throw new Error("Error al consultar alumnos en el servidor")
        }
        return await respuesta.json()
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

/**
 * Renderiza en el DOM las filas de la tabla de alumnos con sus botones de edición y borrado.
 *
 * @param {Array} alumnos Lista de alumnos proveniente del backend.
 */
function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.legajo}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button
                    class="btn-editar"
                    data-legajo="${alumno.legajo}"
                    title="Editar alumno">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    class="btn-eliminar"
                    data-legajo="${alumno.legajo}"
                    title="Eliminar alumno">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }
}

/**
 * Envía una petición DELETE al backend para eliminar un alumno por su legajo.
 *
 * @param {number} legajo Número de legajo del alumno a eliminar.
 */
async function eliminarAlumno(legajo) {
    try {
        const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
            method: "DELETE"
        })
        if (!respuesta.ok) {
            mostrarMensaje("No se pudo eliminar el alumno", "mje-error")
            return
        }

        if (alumnoEditandoLegajo === legajo) {
            cancelarEdicion()
        }
        mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
        await actualizarListaAlumnos()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje("Error de conexión al eliminar el alumno", "mje-error")
    }
}

/**
 * Recarga el listado de alumnos desde MongoDB y actualiza la vista.
 */
async function actualizarListaAlumnos() {
    try {
        const alumnos = await obtenerAlumnos()
        mostrarAlumnos(alumnos)
    } catch (error) {
        mostrarMensaje("No se pudo cargar la lista de alumnos", "mje-error")
    }
}

// DELEGACIÓN DE EVENTOS EN TABLA: Detecta clics en los botones Editar y Eliminar de cada fila
listaAlumnos.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar")
    if (botonEliminar) {
        const legajo = Number(botonEliminar.dataset.legajo)
        const confirmar = confirm("¿Está seguro de eliminar este alumno?")
        if (confirmar) {
            eliminarAlumno(legajo)
        }
    }
    const botonEditar = e.target.closest(".btn-editar")
    if (botonEditar) {
        const legajo = Number(botonEditar.dataset.legajo)
        editarAlumno(legajo)
    }
})

/**
 * Carga los datos del alumno seleccionado en el formulario para su edición.
 *
 * @param {number} legajo Legajo del alumno a editar.
 */
async function editarAlumno(legajo) {
    try {
        const alumnos = await obtenerAlumnos()
        const alumno = alumnos.find(item => item.legajo === legajo)

        if (!alumno) {
            mostrarMensaje("Alumno no encontrado", "mje-error")
            return
        }
        document.querySelector("#legajo").value = alumno.legajo
        document.querySelector("#legajo").disabled = true
        document.querySelector("#nombre").value = alumno.nombre
        document.querySelector("#carrera").value = alumno.carrera
        document.querySelector("#correo").value = alumno.correo

        alumnoEditar = {
            nombre: alumno.nombre,
            carrera: alumno.carrera,
            correo: alumno.correo
        }

        alumnoEditandoLegajo = alumno.legajo
        btnCancelar.style.display = "inline-block"
        btnGuardar.textContent = "Actualizar Alumno"
        document.querySelector("#nombre").focus()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje("No se pudieron cargar los datos del alumno", "mje-error")
    }
}

/**
 * Restablece el formulario al modo de creación de nuevo alumno.
 */
function cancelarEdicion() {
    formulario.reset()
    alumnoEditandoLegajo = null
    alumnoEditar = null
    btnGuardar.textContent = "Guardar Alumno"
    document.querySelector("#legajo").disabled = false
    btnCancelar.style.display = "none"
    document.querySelector("#legajo").focus()
}

btnCancelar.addEventListener("click", cancelarEdicion)

async function iniciar() {
    await actualizarListaAlumnos()
}

iniciar()
