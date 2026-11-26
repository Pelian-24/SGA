// Importa hooks de React para manejar el estado local y la carga asíncrona del listado
import { useEffect, useState } from "react"
// Importa componentes de interfaz de Material UI
import { Alert, Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
// Importa useAuth para obtener el token JWT y el rol del usuario conectado
import { useAuth } from "../context/useAuth"
// Importa la URL base del backend configurada por entorno
import API_URL from "../config/api"

// Endpoint base del módulo Docentes
const API_DOCENTES = `${API_URL}/docentes`

// Muestra la lista de docentes y habilita acciones de edición/eliminación solo para administradores
export function ListaDocentes({ actualizar, onDocenteCreado, onEditarDocente }) {
    // Guarda los docentes recibidos desde el backend
    const [docentes, setDocentes] = useState([])
    // Indica si el listado está cargando
    const [cargando, setCargando] = useState(true)
    // Guarda el mensaje de error si falla la consulta
    const [error, setError] = useState("")
    // Extrae el token y los datos del usuario desde el contexto global
    const { token, usuario } = useAuth()

    // Solicita confirmación y elimina un docente por su DNI (solo disponible para admin)
    async function eliminarDocente(dni) {
        const confirmar = window.confirm("¿Seguro que querés eliminar este docente?")
        if (!confirmar) {
            return
        }
        try {
            // Envía la petición DELETE con el token de autorización
            const respuesta = await fetch(`${API_DOCENTES}/${dni}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            // Refresca la lista tras confirmar la eliminación
            onDocenteCreado()
        } catch (err) {
            console.error("Error al eliminar docente:", err)
            alert(err.message || "No se pudo eliminar el docente")
        }
    }

    // Carga el listado de docentes al montar el componente o cuando cambia "actualizar" o "token"
    useEffect(() => {
        async function cargarDocentes() {
            setCargando(true)
            setError("")

            try {
                // Consulta GET protegida con el token JWT
                const respuesta = await fetch(API_DOCENTES, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!respuesta.ok) {
                    throw new Error(`No se pudo obtener la lista (HTTP ${respuesta.status})`)
                }
                const datos = await respuesta.json()
                setDocentes(datos)
            } catch (err) {
                console.error("Error de conexión al cargar docentes:", err)
                setError("No se pudo cargar la lista de docentes. Verificá que el backend esté activo.")
            } finally {
                setCargando(false)
            }
        }
        cargarDocentes()
    }, [actualizar, token])

    // Muestra un indicador simple mientras se esperan los datos del servidor
    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando docentes...</Typography>
            </Paper>
        )
    }

    // Muestra una alerta si ocurrió un error al cargar el listado
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }

    return (
        // Contenedor principal del listado de docentes
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
                Docentes
            </Typography>

            {/* Mensaje vacío o lista completa de tarjetas de docentes */}
            {docentes.length === 0 ? (
                <Typography color="text.secondary">
                    No hay docentes registrados.
                </Typography>
            ) : (
                <Stack
                    component="ul"
                    spacing={1.5}
                    sx={{ listStyle: "none", p: 0, m: 0 }}
                >
                    {docentes.map((docente) => (
                        // Tarjeta individual de cada docente identificada por su DNI único
                        <Paper
                            component="li"
                            key={docente.dni}
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
                            {/* Datos principales del docente (DNI, nombre, especialidad y correo) */}
                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{ alignItems: "center", flexWrap: "wrap" }}
                            >
                                <Chip label={`DNI ${docente.dni}`} color="primary" variant="outlined" size="small" />
                                <Box>
                                    <Typography fontWeight={600}>{docente.nombre}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {docente.especialidad} • {docente.correo}
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* Muestra los botones Editar y Eliminar únicamente al rol "admin" */}
                            {usuario?.rol === "admin" && (
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarDocente(docente)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarDocente(docente.dni)}
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
