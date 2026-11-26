// Importa componentes de barra de navegación de Material UI
import { AppBar, Box, Button, Container, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material"
// Importa el ícono de ayuda para enlazar a la página de Preguntas Frecuentes
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded"
// Importa Link (renombrado a RouterLink) y useNavigate para la navegación interna sin recargas
import { Link as RouterLink, useNavigate } from "react-router-dom"
// Importa el interruptor que alterna entre modo claro y oscuro
import SelectorTema from "./SelectorTema"
// Importa useAuth para acceder a la acción cerrarSesion
import { useAuth } from "../context/useAuth"

// Encabezado global con logotipo, enlaces de navegación, cierre de sesión y selector de tema
export default function Header() {
    // Obtiene la función para limpiar token y usuario desde el contexto de autenticación
    const { cerrarSesion } = useAuth()
    // Permite redirigir a la pantalla de login al cerrar sesión
    const navigate = useNavigate()

    // Ejecuta el cierre de sesión y redirige al formulario de inicio de sesión
    const logout = () => {
        cerrarSesion()
        navigate("/login")
    }

    return (
        // Barra superior fija al flujo del documento con fondo del tema activo
        <AppBar
            component="header"
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider"
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: { xs: 76, sm: 88 },
                        py: { xs: 1, sm: 1.5 },
                        gap: { xs: 1.5, sm: 3 },
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}
                >
                    {/* Bloque de marca (logo + nombre del sistema) que redirige al inicio */}
                    <Link
                        component={RouterLink}
                        to="/"
                        aria-label="SGA, ir al inicio"
                        underline="none"
                        sx={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
                    >
                        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                            <Box
                                component="img"
                                src="/sga-logo.svg"
                                alt="Identidad visual de SGA"
                                sx={{
                                    display: "block",
                                    width: { xs: 42, sm: 50 },
                                    height: { xs: 42, sm: 50 },
                                    objectFit: "contain"
                                }}
                            />
                            <Box>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                                    SGA
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Gestión Académica
                                </Typography>
                            </Box>
                        </Stack>
                    </Link>

                    {/* Menú principal con enlaces a cada módulo, ayuda, logout y tema */}
                    <Stack
                        component="nav"
                        aria-label="Navegación principal"
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: { xs: 0.5, sm: 1.5 },
                            flexWrap: "wrap",
                            flex: { xs: "1 1 100%", sm: "0 1 auto" },
                            order: { xs: 2, sm: 0 }
                        }}
                    >
                        {/* Enlace a la página de inicio */}
                        <Link
                            component={RouterLink}
                            to="/"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Inicio
                        </Link>

                        {/* Enlace al módulo Alumnos */}
                        <Link
                            component={RouterLink}
                            to="/alumnos"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Alumnos
                        </Link>

                        {/* Enlace al módulo Docentes */}
                        <Link
                            component={RouterLink}
                            to="/docentes"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Docentes
                        </Link>

                        {/* Enlace al módulo Materias */}
                        <Link
                            component={RouterLink}
                            to="/materias"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Materias
                        </Link>

                        {/* Botón con ícono de pregunta que lleva a Preguntas Frecuentes */}
                        <IconButton
                            component={RouterLink}
                            to="/ayuda"
                            aria-label="Ayuda"
                            color="primary"
                            sx={{ mx: 0.25 }}
                        >
                            <HelpOutlineRoundedIcon />
                        </IconButton>

                        {/* Botón para finalizar la sesión actual */}
                        <Button
                            type="button"
                            color="inherit"
                            variant="outlined"
                            onClick={logout}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                            Cerrar sesión
                        </Button>

                        {/* Switch de cambio entre tema claro y tema oscuro */}
                        <SelectorTema />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
