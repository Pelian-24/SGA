// Importa Navigate para redirigir y Outlet para renderizar las rutas hijas permitidas
import { Navigate, Outlet } from "react-router-dom"
// Importa el hook de autenticación para consultar token y estado de verificación inicial
import { useAuth } from "../context/useAuth"

// Componente de guardia que restringe el acceso a las rutas privadas del SGA
const RutaProtegida = () => {
    // Lee si hay token válido y si todavía está corriendo la verificación inicial
    const { token, cargando } = useAuth()

    // Mientras verifica el token contra el backend, muestra un mensaje de espera
    if (cargando) {
        return <p>Verificando sesión...</p>
    }

    // Si no existe sesión válida, redirige automáticamente a /login reemplazando el historial
    if (!token) {
        return <Navigate to="/login" replace />
    }

    // Si el usuario está autenticado, habilita las rutas hijas configuradas en App.jsx
    return <Outlet />
}

// Exporta RutaProtegida para envolver el layout principal en App.jsx
export default RutaProtegida
