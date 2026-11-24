import { useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useAuth } from "../context/useAuth"

const API_MATERIAS = "http://localhost:3000/materias"

function FormularioMateria({
    onMateriaGuardada,
    materiaEditar,
    onCancelar,
    mensajeExito,
    onLimpiarMensaje
}) {
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "activa"
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)
    const { token } = useAuth()

    function manejarCambio(e) {
        const { name, value } = e.target
        if (error) setError("")
        if (mensajeExito && onLimpiarMensaje) onLimpiarMensaje()

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    function validarFormulario() {
        if (
            formulario.codigo.trim() === "" ||
            formulario.nombre.trim() === "" ||
            formulario.cargaHoraria.trim() === "" ||
            formulario.estado.trim() === ""
        ) {
            return "Los campos código, nombre, carga horaria y estado son obligatorios"
        }

        if (formulario.nombre.trim().length < 3) {
            return "El nombre debe tener al menos 3 caracteres"
        }

        if (formulario.descripcion !== "" && formulario.descripcion.trim() === "") {
            return "La descripción no puede contener únicamente espacios"
        }

        const cargaNumero = Number(formulario.cargaHoraria)
        if (!Number.isInteger(cargaNumero) || cargaNumero <= 0) {
            return "La carga horaria debe ser un número entero mayor que cero"
        }

        if (!["activa", "inactiva"].includes(formulario.estado)) {
            return "El estado solo admite los valores activa o inactiva"
        }

        return ""
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        if (onLimpiarMensaje) onLimpiarMensaje()

        const errorValidacion = validarFormulario()
        if (errorValidacion) {
            setError(errorValidacion)
            return
        }

        setGuardando(true)

        const materia = {
            codigo: formulario.codigo.trim(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            cargaHoraria: Number(formulario.cargaHoraria),
            estado: formulario.estado
        }

        const editando = Boolean(materiaEditar)
        const url = editando
            ? `${API_MATERIAS}/${encodeURIComponent(materiaEditar.codigo)}`
            : API_MATERIAS

        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(materia)
            })

            const datos = await respuesta.json().catch(() => ({}))

            if (!respuesta.ok) {
                throw new Error(datos.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: "activa"
            })

            onMateriaGuardada(
                editando
                    ? "Materia modificada correctamente"
                    : "Materia registrada correctamente"
            )
        } catch (err) {
            console.error("Error al guardar materia:", err)
            setError(err.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }

    function cancelar() {
        setError("")
        onCancelar()
    }

    return (
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
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>
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
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
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
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
                {mensajeExito && !error && (
                    <Alert severity="success" role="status" sx={{ gridColumn: "1 / -1" }}>
                        {mensajeExito}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}

export default FormularioMateria
