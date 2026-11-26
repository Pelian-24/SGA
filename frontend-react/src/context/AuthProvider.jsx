// Importa hooks de React para manejar el estado y verificar la sesión al cargar la app
import { useEffect, useState } from "react"
// Importa el contexto donde se expondrán los datos de autenticación
import { AuthContext } from "./AuthContext"
// Importa la URL base del backend definida según el entorno (local o Render)
import API_URL from "../config/api"

// Proveedor global que gestiona el token JWT, los datos del usuario y su verificación inicial
const AuthProvider = ({ children }) => {
    // Inicializa el token leyendo el valor almacenado en localStorage
    const [token, setToken] = useState(() => localStorage.getItem("token"))

    // Inicializa el objeto usuario desde localStorage para mantener el rol tras recargar (F5)
    const [usuario, setUsuario] = useState(() => {
        try {
            const usuarioGuardado = localStorage.getItem("usuario")
            return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
        } catch {
            // Si el valor almacenado no es un JSON válido, comienza sin usuario
            return null
        }
    })

    // Indica si todavía se está comprobando la validez del token contra el backend
    const [cargando, setCargando] = useState(true)

    // Elimina el token y el usuario tanto de localStorage como del estado de React
    const cerrarSesion = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        setToken(null)
        setUsuario(null)
    }

    // Al montar la aplicación, comprueba contra el backend si el token guardado sigue vigente
    useEffect(() => {
        const verificarSesion = async () => {
            // Obtiene el token persistido en el navegador
            const tokenGuardado = localStorage.getItem("token")

            // Si no existe token guardado, limpia el estado y termina la verificación
            if (!tokenGuardado) {
                setToken(null)
                setUsuario(null)
                setCargando(false)
                return
            }

            try {
                // Realiza una consulta protegida para validar que el token no venció ni fue alterado
                const respuesta = await fetch(`${API_URL}/alumnos`, {
                    headers: { Authorization: `Bearer ${tokenGuardado}` }
                })

                // Si el backend rechaza el token, fuerza el cierre de sesión
                if (!respuesta.ok) {
                    throw new Error("Sesión inválida")
                }

                // Confirma que el token guardado es válido
                setToken(tokenGuardado)
            } catch (error) {
                // Ante cualquier fallo de validación, limpia los datos de sesión
                console.error("Error al verificar la sesión:", error)
                cerrarSesion()
            } finally {
                // Marca como finalizada la comprobación inicial para habilitar las rutas
                setCargando(false)
            }
        }

        verificarSesion()
    }, [])

    // Provee el estado de sesión y sus funciones a todos los componentes hijos
    return (
        <AuthContext.Provider value={{ token, setToken, usuario, setUsuario, cerrarSesion, cargando }}>
            {children}
        </AuthContext.Provider>
    )
}

// Exporta el proveedor para envolver la aplicación en main.jsx
export default AuthProvider
