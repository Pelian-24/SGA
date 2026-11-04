import { Alert, Box, Button, Chip, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

const API_LOGIN = "http://localhost:3000/auth/login"

// PÁGINA DE INICIO DE SESIÓN: Autentica al usuario contra la colección "usuarios" de MongoDB
export default function Login() {
    const [usuario, setUsuario] = useState(null)
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function login(e) {
        e.preventDefault()
        setError("")
        setCargando(true)
        setUsuario(null)
        setMensaje("")

        try {
            const respuesta = await fetch(API_LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const datos = await respuesta.json()
            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudo iniciar sesión")
            }

            setUsuario(
                datos.usuario || {
                    id: datos.id,
                    nombre: datos.nombre,
                    email: datos.email,
                    rol: datos.rol
                }
            )
            setMensaje(datos.mensaje || "Sesión iniciada correctamente")
            setEmail("")
            setPassword("")
        } catch (err) {
            console.error("Error en login:", err)
            setError(err.message || "No se pudo conectar con el servidor.")
        } finally {
            setCargando(false)
        }
    }

    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                maxWidth: 480,
                mx: "auto",
                p: { xs: 3, sm: 4 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Ingresá tus credenciales para acceder al Sistema de Gestión Académica.
            </Typography>

            <Box
                component="form"
                onSubmit={login}
                sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
                <TextField
                    id="email"
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={cargando}>
                    {cargando ? "Verificando..." : "Ingresar"}
                </Button>

                {error && (
                    <Alert severity="error" role="alert">
                        {error}
                    </Alert>
                )}

                {mensaje && (
                    <Alert severity="success" role="status">
                        {mensaje}
                    </Alert>
                )}

                {usuario && (
                    <Paper
                        variant="outlined"
                        sx={{ p: 2, borderRadius: 3, bgcolor: "background.default" }}
                    >
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                            <Typography fontWeight={700}>{usuario.nombre}</Typography>
                            <Chip label={usuario.rol} size="small" color="primary" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            {usuario.email}
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Paper>
    )
}
