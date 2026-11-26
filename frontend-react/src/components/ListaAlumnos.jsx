// Importa hooks de React para manejar el estado local y la carga asíncrona del listado
import { useEffect, useState } from "react"
// Importa componentes de interfaz de Material UI
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
// Importa useAuth para obtener el token JWT y el rol del usuario conectado
import { useAuth } from "../context/useAuth"
// Importa la URL base del backend configurada por entorno
import API_URL from "../config/api"

// Endpoint base del módulo Alumnos
const API_ALUMNOS = `${API_URL}/alumnos`

// Muestra la lista de alumnos y habilita acciones de edición/eliminación solo para administradores
export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    // Guarda los alumnos recibidos desde el backend
    const [alumnos, setAlumnos] = useState([])
    // Indica si el listado está cargando
    const [cargando, setCargando] = useState(true)
    // Guarda el mensaje de error si falla la consulta
    const [error, setError] = useState("")
    // Extrae el token y los datos del usuario desde el contexto global
    const { token, usuario } = useAuth()

    // Solicita confirmación y elimina un alumno por su legajo (solo disponible para admin)
    async function eliminarAlumno(legajo) {
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            // Envía la petición DELETE con el token de autorización
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            // Refresca la lista tras confirmar la eliminación
            onAlumnoCreado()
        } catch (err) {
            console.error("Error al eliminar alumno:", err)
            alert(err.message || "No se pudo eliminar el alumno")
        }
    }

    // Carga el listado de alumnos al montar el componente o cuando cambia "actualizar" o "token"
    useEffect(() => {
        async function cargarAlumnos() {
            setCargando(true)
            setError("")

            try {
                // Consulta GET protegida con el token JWT
                const respuesta = await fetch(API_ALUMNOS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!respuesta.ok) {
                    throw new Error(`No se pudo obtener la lista (HTTP ${respuesta.status})`)
                }
                const datos = await respuesta.json()
                setAlumnos(datos)
            } catch (err) {
                console.error("Error de conexión al cargar alumnos:", err)
                setError("No se pudo cargar la lista de alumnos. Verificá que el backend esté activo.")
            } finally {
                setCargando(false)
            }
        }
        cargarAlumnos()
    }, [actualizar, token])

    // Muestra un indicador simple mientras se esperan los datos del servidor
    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando alumnos...</Typography>
            </Paper>
        )
    }

    // Muestra una alerta si ocurrió un error al cargar el listado
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }

    return (
        // Contenedor principal del listado de alumnos
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            {/* Título de la sección */}
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Alumnos
            </Typography>

            {/* Mensaje vacío o lista completa de tarjetas de alumnos */}
            {alumnos.length === 0 ? (
                <Typography color="text.secondary">
                    No hay alumnos registrados.
                </Typography>
            ) : (
                <Stack
                    component="ul"
                    spacing={1.5}
                    sx={{ listStyle: "none", p: 0, m: 0 }}
                >
                    {alumnos.map((alumno) => (
                        // Tarjeta individual de cada alumno identificada por su legajo único
                        <Paper
                            component="li"
                            key={alumno.legajo}
                            elevation={0}
                            sx={{
                                p: { xs: 2, sm: 2.5 },
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: { xs: "stretch", sm: "center" },
                                justifyContent: "space-between",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2
                            }}
                        >
                            {/* Datos principales del alumno (legajo, nombre, carrera y correo) */}
                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{ alignItems: "center", flexWrap: "wrap" }}
                            >
                                <Chip label={`Legajo ${alumno.legajo}`} color="primary" variant="outlined" size="small" />
                                <Box>
                                    <Typography fontWeight={600}>{alumno.nombre}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {alumno.carrera} • {alumno.correo}
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* Muestra los botones Editar y Eliminar únicamente al rol "admin" */}
                            {usuario?.rol === "admin" && (
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarAlumno(alumno)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarAlumno(alumno.legajo)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            )}
                        </Paper>
                    ))}
                </Stack>
            )}
        </Paper>
    )
}
