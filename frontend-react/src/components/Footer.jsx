// Importa componentes de Material UI para estructurar el pie de página
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

// Pie de página global mostrado al final de todas las pantallas internas del SGA
export default function Footer() {
    return (
        // Contenedor semántico footer con borde superior divisorio
        <Box
            component="footer"
            sx={{
                py: 2.5,
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "background.paper"
            }}
        >
            {/* Contenedor centrado que alinea el nombre del sistema y la asignatura */}
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    Sistema de Gestión Académica
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    SGA: Proyecto Programación IV
                </Typography>
            </Container>
        </Box>
    )
}
