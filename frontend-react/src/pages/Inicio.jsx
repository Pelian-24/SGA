// Importa componentes de interfaz de Material UI para el bloque de bienvenida
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

// Página principal de bienvenida mostrada al ingresar al SGA
export default function Inicio() {
    return (
        // Tarjeta destacada con degradado suave basado en el tema activo
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                overflow: "hidden",
                px: { xs: 3, sm: 5, md: 7 },
                py: { xs: 5, sm: 7, md: 9 },
                border: 1,
                borderColor: "divider",
                borderRadius: { xs: 4, md: 6 },
                background: theme => `linear-gradient(135deg, ${theme.palette.background.paper} 55%, ${theme.palette.action.hover} 100%)`
            }}
        >
            {/* Contenedor de texto con ancho máximo para mantener una lectura cómoda */}
            <Box sx={{ maxWidth: 720 }}>
                {/* Título principal de la aplicación */}
                <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                        mb: 2,
                        fontWeight: 800,
                        letterSpacing: { xs: "-0.03em", md: "-0.045em" },
                        fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem" }
                    }}
                >
                    Sistema de Gestión Académica
                </Typography>

                {/* Mensaje introductorio que invita a recorrer el menú superior */}
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.7 }}>
                    Bienvenido/a al sistema. Desde el menú podés acceder
                    a las secciones disponibles.
                </Typography>
            </Box>
        </Paper>
    )
}
