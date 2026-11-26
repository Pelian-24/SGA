// Importa useState para controlar los campos del formulario, errores y estado de envío
import { useState } from "react"
// Importa componentes de interfaz de Material UI
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
// Importa el hook de autenticación para enviar el token JWT en las peticiones
import { useAuth } from "../context/useAuth"
// Importa la URL base del backend configurada por entorno
import API_URL from "../config/api"

// Endpoint base del módulo Materias
const API_MATERIAS = `${API_URL}/materias`

// Formulario reutilizable para registrar una nueva materia o editar una existente
function FormularioMateria({
    onMateriaGuardada,
    materiaEditar,
    onCancelar,
    mensajeExito,
    onLimpiarMensaje
}) {
    // Inicializa los campos vacíos o precargados si se seleccionó una materia para editar
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "activa"
    })
    // Guarda el mensaje de error de validación local o de respuesta del backend
    const [error, setError] = useState("")
    // Bloquea los controles mientras la solicitud está en proceso
    const [guardando, setGuardando] = useState(false)
    // Obtiene el token JWT del usuario autenticado
    const { token } = useAuth()

    // Actualiza el campo editado y limpia alertas previas cuando el usuario escribe
    function manejarCambio(e) {
        const { name, value } = e.target
        if (error) setError("")
        if (mensajeExito && onLimpiarMensaje) onLimpiarMensaje()

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    // Valida las reglas de negocio en el cliente antes de enviar la solicitud al servidor
    function validarFormulario() {
        // Verifica que estén completos todos los campos obligatorios
        if (
            formulario.codigo.trim() === "" ||
            formulario.nombre.trim() === "" ||
            formulario.cargaHoraria.trim() === "" ||
            formulario.estado.trim() === ""
        ) {
            return "Los campos código, nombre, carga horaria y estado son obligatorios"
        }

        // Exige un mínimo de 3 caracteres para el nombre
        if (formulario.nombre.trim().length < 3) {
            return "El nombre debe tener al menos 3 caracteres"
        }

        // Impide guardar una descripción compuesta únicamente por espacios
        if (formulario.descripcion !== "" && formulario.descripcion.trim() === "") {
            return "La descripción no puede contener únicamente espacios"
        }

        // Verifica que la carga horaria sea un número entero mayor a cero
        const cargaNumero = Number(formulario.cargaHoraria)
        if (!Number.isInteger(cargaNumero) || cargaNumero <= 0) {
            return "La carga horaria debe ser un número entero mayor que cero"
        }

        // Comprueba que el estado corresponda a uno de los valores permitidos
        if (!["activa", "inactiva"].includes(formulario.estado)) {
            return "El estado solo admite los valores activa o inactiva"
        }

        // Si todas las validaciones pasan, devuelve cadena vacía
        return ""
    }

    // Valida los datos y ejecuta el alta (POST) o modificación (PUT) de la materia en el backend
    async function guardar(e) {
        // Evita el envío tradicional del formulario
        e.preventDefault()
        setError("")
        if (onLimpiarMensaje) onLimpiarMensaje()

        // Detiene el envío si alguna validación local falla
        const errorValidacion = validarFormulario()
        if (errorValidacion) {
            setError(errorValidacion)
            return
        }

        setGuardando(true)

        // Construye el objeto limpio con los tipos esperados por la API
        const materia = {
            codigo: formulario.codigo.trim(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            cargaHoraria: Number(formulario.cargaHoraria),
            estado: formulario.estado
        }

        // Determina el método HTTP y la URL según si se está editando o creando
        const editando = Boolean(materiaEditar)
        const url = editando
            ? `${API_MATERIAS}/${encodeURIComponent(materiaEditar.codigo)}`
            : API_MATERIAS

        try {
            // Envía la solicitud autenticada al backend
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(materia)
            })

            // Lee el cuerpo de respuesta de forma segura
            const datos = await respuesta.json().catch(() => ({}))

            // Si la API respondió con error, lanza el mensaje correspondiente
            if (!respuesta.ok) {
                throw new Error(datos.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            // Reinicia los campos del formulario tras guardar con éxito
            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: "activa"
            })

            // Informa al componente padre para recargar la lista y mostrar la confirmación
            onMateriaGuardada(
                editando
                    ? "Materia modificada correctamente"
                    : "Materia registrada correctamente"
            )
        } catch (err) {
            // Registra el fallo y muestra el mensaje en la alerta de error
            console.error("Error al guardar materia:", err)
            setError(err.message || "No se pudo conectar con el servidor")
        } finally {
            // Restaura el estado interactivo del formulario
            setGuardando(false)
        }
    }

    // Limpia el error local y cierra el modo edición
    function cancelar() {
        setError("")
        onCancelar()
    }

    return (
        // Tarjeta contenedora del formulario de materias
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
            {/* Título dinámico del formulario */}
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>

            {/* Formulario con validación propia (noValidate) para mostrar alertas personalizadas */}
            <Box
                component="form"
                onSubmit={guardar}
                noValidate
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                {/* Campo Código único de la materia */}
                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    placeholder="Ej: PRG4"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                {/* Campo Nombre de la materia */}
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                {/* Campo Carga horaria expresada en horas enteras */}
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga horaria"
                    type="number"
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                {/* Selector de estado permitido: activa o inactiva */}
                <TextField
                    id="estado"
                    name="estado"
                    label="Estado"
                    select
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>

                {/* Campo opcional de descripción multilínea */}
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    multiline
                    rows={2}
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                />

                {/* Botonera de envío y cancelación */}
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
                            : materiaEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {materiaEditar && (
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

                {/* Alerta roja si hay error de validación o del servidor */}
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}

                {/* Alerta verde de confirmación tras guardar o eliminar */}
                {mensajeExito && !error && (
                    <Alert severity="success" role="status" sx={{ gridColumn: "1 / -1" }}>
                        {mensajeExito}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}

// Exporta el componente para utilizarlo en la página Materias
export default FormularioMateria
