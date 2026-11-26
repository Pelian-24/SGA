// Importa useState para controlar los campos del formulario y mensajes de estado
import { useState } from "react"
// Importa componentes visuales de Material UI para construir la pantalla de acceso
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
// Importa useTheme para usar los colores activos del tema claro u oscuro
import { useTheme } from "@mui/material/styles"
// Importa useNavigate para redirigir al inicio tras autenticarse
import { useNavigate } from "react-router-dom"
// Importa el hook de autenticación para actualizar token y usuario globales
import { useAuth } from "../context/useAuth"
// Importa la URL base del backend según el entorno
import API_URL from "../config/api"

// Pantalla de inicio de sesión del SGA
export default function Login() {
    // Permite navegar programáticamente hacia otras rutas
    const navigate = useNavigate()
    // Obtiene las funciones globales de sesión y el usuario actual desde el contexto
    const { setToken, usuario, setUsuario } = useAuth()
    // Accede a la paleta de colores del tema vigente
    const theme = useTheme()

    // Estados locales para mensajes de error, éxito y bloqueo del botón mientras envía
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState("")

    // Estados controlados para los campos de correo electrónico y contraseña
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Envía las credenciales al backend, guarda la sesión y redirige al inicio
    async function login(e) {
        // Evita que el navegador recargue la página al enviar el formulario
        e.preventDefault()
        // Limpia mensajes previos y activa el estado de carga
        setError("")
        setCargando(true)
        setMensaje("")

        try {
            // Envía la petición POST al endpoint de autenticación del backend
            const respuesta = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            // Interpreta la respuesta JSON enviada por el servidor
            const datos = await respuesta.json()

            // Si el servidor devolvió error (400/401/500), lanza el mensaje recibido
            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudo iniciar sesión")
            }

            // Construye el objeto con los datos básicos del usuario autenticado (incluido su rol)
            const usuarioActual = {
                id: datos.id,
                nombre: datos.nombre,
                email: datos.email,
                rol: datos.rol
            }

            // Persiste el token y el usuario en localStorage para conservar la sesión al recargar
            localStorage.setItem("token", datos.token)
            localStorage.setItem("usuario", JSON.stringify(usuarioActual))

            // Actualiza el contexto global de autenticación
            setToken(datos.token)
            setUsuario(usuarioActual)
            setMensaje(datos.mensaje)

            // Limpia los campos del formulario y redirige a la pantalla de inicio
            setEmail("")
            setPassword("")
            navigate("/")
        } catch (err) {
            // Registra el fallo en consola y muestra el error al usuario
            console.error("Error en login:", err)
            setError(err.message || "No se pudo conectar con el servidor.")
        } finally {
            // Desactiva el estado de carga al terminar el intento
            setCargando(false)
        }
    }

    return (
        // Contenedor principal centrado vertical y horizontalmente
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                backgroundColor: theme.palette.background.default
            }}
        >
            {/* Tarjeta del formulario de inicio de sesión */}
            <Box
                component="form"
                onSubmit={login}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: `0 12px 32px ${theme.palette.divider}`
                }}
            >
                {/* Título principal de la pantalla */}
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        mb: 3,
                        textAlign: "center",
                        color: theme.palette.text.primary,
                        fontWeight: 700
                    }}
                >
                    Iniciar sesión
                </Typography>

                {/* Campo controlado para ingresar el correo electrónico */}
                <TextField
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                    fullWidth
                    margin="normal"
                    sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2 }
                    }}
                />

                {/* Campo controlado para ingresar la contraseña */}
                <TextField
                    type="password"
                    label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    fullWidth
                    margin="normal"
                    sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2 }
                    }}
                />

                {/* Alerta de error cuando las credenciales son incorrectas o falla la conexión */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Alerta de confirmación cuando el login se realiza correctamente */}
                {mensaje && (
                    <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                        {mensaje}
                    </Alert>
                )}

                {/* Botón de envío que se deshabilita mientras la petición está en curso */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={cargando}
                    sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700
                    }}
                >
                    {cargando ? "Ingresando..." : "Ingresar"}
                </Button>

                {/* Muestra los datos del usuario si existe una sesión cargada en el contexto */}
                {usuario && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1">
                            Bienvenido/a, {usuario.nombre}
                        </Typography>
                        <Typography variant="body2">
                            Correo: {usuario.email}
                        </Typography>
                        <Typography variant="body2">
                            Rol: {usuario.rol}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
