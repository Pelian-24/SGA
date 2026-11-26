// Importa Box de Material UI para estructurar la disposición vertical de la página
import Box from "@mui/material/Box"
// Importa Outlet para insertar la página activa de cada ruta hija
import { Outlet } from "react-router-dom"
// Importa el encabezado y pie de página compartidos
import Header from "../components/Header"
import Footer from "../components/Footer"

// Plantilla principal del SGA: mantiene fijo el Header arriba y el Footer abajo
export default function LayoutPpal() {
    return (
        // Contenedor de altura completa en columna usando colores del tema activo
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
                color: "text.primary"
            }}
        >
            {/* Barra superior de navegación */}
            <Header />

            {/* Área principal centrada donde se renderiza la pantalla actual (Inicio, Alumnos, etc.) */}
            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: 1120,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 4, md: 6 },
                    flex: 1
                }}
            >
                <Outlet />
            </Box>

            {/* Pie de página común a todas las secciones */}
            <Footer />
        </Box>
    )
}
