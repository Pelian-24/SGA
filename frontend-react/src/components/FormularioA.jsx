// Importa useState para controlar los campos del formulario, errores y estado de envío
import { useState } from "react"
// Importa componentes de interfaz de Material UI
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
// Importa el hook de autenticación para enviar el token JWT en las peticiones
import { useAuth } from "../context/useAuth"
// Importa la URL base del backend configurada por entorno
import API_URL from "../config/api"

// Endpoint base del módulo Alumnos
const API_ALUMNOS = `${API_URL}/alumnos`

// Formulario reutilizable para registrar un nuevo alumno o modificar uno existente
function FormularioA({ onAlumnoCreado, alumnoEditar, onCancelar }) {
    // Inicializa los campos vacíos o precargados si se seleccionó un alumno para editar
    const [formulario, setFormulario] = useState({
        legajo: String(alumnoEditar?.legajo ?? ""),
        nombre: alumnoEditar?.nombre ?? "",
        carrera: alumnoEditar?.carrera ?? "",
        correo: alumnoEditar?.correo ?? ""
    })
    // Almacena el mensaje de error si el backend o la red rechazan el guardado
    const [error, setError] = useState("")
    // Evita envíos duplicados mientras la petición fetch está en curso
    const [guardando, setGuardando] = useState(false)
    // Obtiene el token JWT del usuario autenticado
    const { token } = useAuth()

    // Actualiza en el estado únicamente el campo modificado por el usuario
    function manejarCambio(e) {
        const { name, value } = e.target
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    // Envía los datos del formulario al backend (POST para alta o PUT para edición)
    async function guardar(e) {
        // Evita la recarga nativa del formulario HTML
        e.preventDefault()
        setError("")
        setGuardando(true)

        // Prepara el objeto a enviar convirtiendo el legajo a número
        const alumno = {
            ...formulario,
            legajo: Number(formulario.legajo)
        }
        // Determina si la operación corresponde a una edición o a un registro nuevo
        const editando = Boolean(alumnoEditar)
        // Construye la URL de destino según el modo de operación
        const url = editando
            ? `${API_ALUMNOS}/${alumnoEditar.legajo}`
            : API_ALUMNOS

        try {
            // Ejecuta la solicitud HTTP autenticada con el token Bearer
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(alumno)
            })

            // Si la respuesta no fue exitosa, extrae el mensaje enviado por el backend
            if (!respuesta.ok) {
                const datosError = await respuesta.json().catch(() => ({}))
                throw new Error(datosError.mensaje || `No se pudo guardar el alumno (Estado HTTP: ${respuesta.status})`)
            }

            // Limpia los campos del formulario y notifica al componente padre para refrescar el listado
            setFormulario({
                legajo: "",
                nombre: "",
                carrera: "",
                correo: ""
            })
            onAlumnoCreado()
        } catch (err) {
            // Registra el fallo y muestra un mensaje claro en la interfaz
            console.error("Error al guardar alumno:", err)
            setError(err.message || "No se pudo conectar con el servidor")
        } finally {
            // Vuelve a habilitar los botones al finalizar la petición
            setGuardando(false)
        }
    }

    // Cancela la edición actual delegando el cierre al componente padre
    function cancelar() {
        onCancelar()
    }

    return (
        // Tarjeta contenedora del formulario de alumnos
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            {/* Título dinámico según si se edita o se registra un alumno */}
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {alumnoEditar ? "Editar Alumno" : "Nuevo Alumno"}
            </Typography>

            {/* Formulario distribuido en grilla de 1 columna en móvil y 2 en escritorio */}
            <Box
                component="form"
                onSubmit={guardar}
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                {/* Campo Legajo (se bloquea en modo edición porque es el identificador único) */}
                <TextField
                    id="legajo"
                    name="legajo"
                    label="Legajo"
                    type="number"
                    value={formulario.legajo}
                    onChange={manejarCambio}
                    disabled={Boolean(alumnoEditar)}
                    required
                    fullWidth
                />

                {/* Campo Nombre completo del alumno */}
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                {/* Campo Carrera que cursa el alumno */}
                <TextField
                    id="carrera"
                    name="carrera"
                    label="Carrera"
                    value={formulario.carrera}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                {/* Campo Correo electrónico */}
                <TextField
                    id="correo"
                    name="correo"
                    label="Correo electrónico"
                    type="email"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                {/* Botonera de acciones (Guardar y Cancelar en modo edición) */}
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : alumnoEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {alumnoEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>

                {/* Alerta de error si el guardado falló */}
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}

// Exporta el componente para utilizarlo en la página Alumnos
export default FormularioA
