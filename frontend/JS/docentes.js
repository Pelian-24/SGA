const formulario = document.querySelector("#formDocente")
const listaDocentes = document.querySelector("#listaDocentes")
let docenteEditandoDni = null
let docenteEditar = null
const btnCancelar = document.querySelector("#btnCancelarDocente")
btnCancelar.style.display = "none"
const btnGuardar = document.querySelector("#btnGuardarDocente")
const API_DOCENTES = "http://localhost:3000/docentes"

// MANEJO DE ENVÍO DEL FORMULARIO: Crea un docente nuevo (POST) o actualiza uno existente (PUT) en MongoDB
formulario.addEventListener("submit", async function (event) {
    event.preventDefault()

    const dni = document.querySelector("#dni").value.trim()
    const nombre = document.querySelector("#nombreDocente").value.trim()
    const especialidad = document.querySelector("#especialidad").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (dni === "" || nombre === "" || especialidad === "" || correo === "") {
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
        if (docenteEditandoDni === null) {
            const docente = {
                dni: Number(dni),
                nombre,
                especialidad,
                correo
            }
            const respuesta = await fetch(API_DOCENTES, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(docente)
            })
            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}))
                throw new Error(errorData.mensaje || "La API respondió con un error.")
            }
            mostrarMensaje("Docente guardado correctamente", "mje-exito")
        } else {
            const datosActuales = {
                nombre,
                especialidad,
                correo
            }
            if (JSON.stringify(datosActuales) === JSON.stringify(docenteEditar)) {
                mostrarMensaje("No se realizaron cambios", "mje-adv")
                return
            }
            const respuesta = await fetch(`${API_DOCENTES}/${docenteEditandoDni}`, {
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
            docenteEditandoDni = null
            docenteEditar = null
            btnGuardar.textContent = "Guardar Docente"
            btnCancelar.style.display = "none"
            document.querySelector("#dni").disabled = false

            mostrarMensaje("Docente actualizado correctamente", "mje-exito")
        }
        await actualizarListaDocentes()
        formulario.reset()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje(error.message || "No fue posible realizar la operación", "mje-error")
    }
})

/**
 * Consulta la API REST para obtener todos los docentes almacenados en MongoDB.
 *
 * @returns {Promise<Array>} Arreglo de objetos docente.
 */
async function obtenerDocentes() {
    try {
        const respuesta = await fetch(API_DOCENTES)
        if (!respuesta.ok) {
            throw new Error("Error al consultar docentes en el servidor")
        }
        return await respuesta.json()
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

/**
 * Renderiza en el DOM las filas de la tabla de docentes con sus botones de acción.
 *
 * @param {Array} docentes Lista de docentes proveniente del backend.
 */
function mostrarDocentes(docentes) {
    listaDocentes.innerHTML = ""
    for (const docente of docentes) {
        listaDocentes.innerHTML += `
        <tr>
            <td>${docente.dni}</td>
            <td>${docente.nombre}</td>
            <td>${docente.especialidad}</td>
            <td>${docente.correo}</td>
            <td>
                <button
                    class="btn-editar"
                    data-dni="${docente.dni}"
                    title="Editar docente">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    class="btn-eliminar"
                    data-dni="${docente.dni}"
                    title="Eliminar docente">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }
}

/**
 * Envía una petición DELETE al backend para eliminar un docente por su DNI.
 *
 * @param {number} dni Número de DNI del docente a eliminar.
 */
async function eliminarDocente(dni) {
    try {
        const respuesta = await fetch(`${API_DOCENTES}/${dni}`, {
            method: "DELETE"
        })
        if (!respuesta.ok) {
            mostrarMensaje("No se pudo eliminar el docente", "mje-error")
            return
        }

        if (docenteEditandoDni === dni) {
            cancelarEdicion()
        }
        mostrarMensaje("Docente eliminado correctamente", "mje-exito")
        await actualizarListaDocentes()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje("Error de conexión al eliminar el docente", "mje-error")
    }
}

/**
 * Recarga el listado de docentes desde MongoDB y actualiza la vista.
 */
async function actualizarListaDocentes() {
    try {
        const docentes = await obtenerDocentes()
        mostrarDocentes(docentes)
    } catch (error) {
        mostrarMensaje("No se pudo cargar la lista de docentes", "mje-error")
    }
}

// DELEGACIÓN DE EVENTOS EN TABLA: Detecta clics en los botones Editar y Eliminar de cada fila
listaDocentes.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar")
    if (botonEliminar) {
        const dni = Number(botonEliminar.dataset.dni)
        const confirmar = confirm("¿Está seguro de eliminar este docente?")
        if (confirmar) {
            eliminarDocente(dni)
        }
    }
    const botonEditar = e.target.closest(".btn-editar")
    if (botonEditar) {
        const dni = Number(botonEditar.dataset.dni)
        editarDocente(dni)
    }
})

/**
 * Carga los datos del docente seleccionado en el formulario para su edición.
 *
 * @param {number} dni DNI del docente a editar.
 */
async function editarDocente(dni) {
    try {
        const docentes = await obtenerDocentes()
        const docente = docentes.find(item => item.dni === dni)

        if (!docente) {
            mostrarMensaje("Docente no encontrado", "mje-error")
            return
        }
        document.querySelector("#dni").value = docente.dni
        document.querySelector("#dni").disabled = true
        document.querySelector("#nombreDocente").value = docente.nombre
        document.querySelector("#especialidad").value = docente.especialidad
        document.querySelector("#correo").value = docente.correo

        docenteEditar = {
            nombre: docente.nombre,
            especialidad: docente.especialidad,
            correo: docente.correo
        }

        docenteEditandoDni = docente.dni
        btnCancelar.style.display = "inline-block"
        btnGuardar.textContent = "Actualizar Docente"
        document.querySelector("#nombreDocente").focus()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje("No se pudieron cargar los datos del docente", "mje-error")
    }
}

/**
 * Restablece el formulario al modo de creación de nuevo docente.
 */
function cancelarEdicion() {
    formulario.reset()
    docenteEditandoDni = null
    docenteEditar = null
    btnGuardar.textContent = "Guardar Docente"
    document.querySelector("#dni").disabled = false
    btnCancelar.style.display = "none"
    document.querySelector("#dni").focus()
}

btnCancelar.addEventListener("click", cancelarEdicion)

async function iniciar() {
    await actualizarListaDocentes()
}

iniciar()
