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

// Endpoint base del módulo Materias
const API_MATERIAS = `${API_URL}/materias`

// Muestra la lista de materias y habilita acciones de edición/eliminación solo para administradores
export function ListaMaterias({ actualizar, onMateriaEliminada, onEditarMateria }) {
    // Guarda las materias recibidas desde el backend
    const [materias, setMaterias] = useState([])
    // Indica si el listado está cargando
    const [cargando, setCargando] = useState(true)
    // Guarda el mensaje de error si falla la consulta
    const [error, setError] = useState("")
    // Extrae el token y los datos del usuario desde el contexto global
    const { token, usuario } = useAuth()

    // Solicita confirmación y elimina una materia por su código (solo disponible para admin)
    async function eliminarMateria(codigo) {
        const confirmar = window.confirm("¿Seguro que querés eliminar esta materia?")
        if (!confirmar) {
            return
        }
        try {
            // Envía la petición DELETE codificando el código en la URL y adjuntando el token
            const respuesta = await fetch(`${API_MATERIAS}/${encodeURIComponent(codigo)}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!respuesta.ok) {
                const datos = await respuesta.json().catch(() => ({}))
                throw new Error(datos.mensaje || `No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            // Refresca la lista tras confirmar la eliminación
            onMateriaEliminada()
        } catch (err) {
            console.error("Error al eliminar materia:", err)
            alert(err.message || "No se pudo eliminar la materia")
        }
    }

    // Carga el listado de materias al montar el componente o cuando cambia "actualizar" o "token"
    useEffect(() => {
        async function cargarMaterias() {
            setCargando(true)
            setError("")

            try {
                // Consulta GET protegida con el token JWT
                const respuesta = await fetch(API_MATERIAS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (!respuesta.ok) {
                    throw new Error("No se pudo obtener la lista")
                }

                const datos = await respuesta.json()
                setMaterias(datos)
            } catch (err) {
                console.error("Error de conexión al cargar materias:", err)
                setError("No se pudo cargar la lista de materias. Verificá que el backend esté activo.")
            } finally {
                setCargando(false)
            }
        }
        cargarMaterias()
    }, [actualizar, token])

    // Muestra un indicador simple mientras se esperan los datos del servidor
    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando materias...</Typography>
            </Paper>
        )
    }

    // Muestra una alerta si ocurrió un error al cargar el listado
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }

    return (
        // Contenedor principal del listado de materias
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
                Materias
            </Typography>

            {/* Mensaje vacío o lista completa de tarjetas de materias */}
            {materias.length === 0
                ? (
                    <Typography color="text.secondary">
                        No hay materias registradas.
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {materias.map(materia => (
                            // Tarjeta individual de cada materia identificada por su código único
                            <Paper
                                component="li"
                                key={materia.codigo}
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
                                {/* Datos principales de la materia (código, nombre, estado, horas y descripción) */}
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: "flex-start", flexWrap: "wrap" }}
                                >
                                    <Chip
                                        label={`Código ${materia.codigo}`}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Box>
                                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                                            <Typography fontWeight={600}>{materia.nombre}</Typography>
                                            <Chip
                                                label={materia.estado}
                                                color={materia.estado === "activa" ? "success" : "default"}
                                                size="small"
                                            />
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">
                                            Carga horaria: {materia.cargaHoraria} hs
                                        </Typography>
                                        {materia.descripcion && (
                                            <Typography variant="body2" color="text.secondary">
                                                {materia.descripcion}
                                            </Typography>
                                        )}
                                    </Box>
                                </Stack>

                                {/* Muestra los botones Editar y Eliminar únicamente al rol "admin" */}
                                {usuario?.rol === "admin" && (
                                    <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                        <Button
                                            type="button"
                                            onClick={() => onEditarMateria(materia)}
                                            variant="outlined"
                                            size="small"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => eliminarMateria(materia.codigo)}
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
