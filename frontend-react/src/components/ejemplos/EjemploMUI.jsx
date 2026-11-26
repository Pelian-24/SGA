// Importa componentes de botones, apilado e íconos de Material UI
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import DeleteIcon from "@mui/icons-material/Delete"
import SendIcon from "@mui/icons-material/Send"

// Componente de práctica de clase: muestra variantes, íconos y estilos personalizados de MUI
function EjemploMUI() {
    return (
        <>
            {/* Fila de botones básicos con variantes contained y outlined */}
            <Stack spacing={1} direction="row">
                <Button variant="contained">Aceptar</Button>
                <Button variant="contained">Guardar</Button>
                <Button variant="outlined">Cancelar</Button>
            </Stack>

            {/* Fila de botones con íconos y personalización de colores mediante la prop sx */}
            <Stack direction="row" spacing={2} sx={{ mt: 2, mx: 3 }}>
                <Button variant="contained" startIcon={<DeleteIcon />} color="error">
                    Borrar
                </Button>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{
                        bgcolor: "#4fb6dc",
                        color: "#251b1b",
                        "&:hover": { bgcolor: "#96b0b4" }
                    }}
                >
                    Enviar
                </Button>
            </Stack>
        </>
    )
}

// Exporta el componente de ejemplo de Material UI
export default EjemploMUI
