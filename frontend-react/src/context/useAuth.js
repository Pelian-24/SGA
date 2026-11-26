// Importa useContext para consumir el contexto de autenticación
import { useContext } from "react"
// Importa el contexto creado en AuthContext.jsx
import { AuthContext } from "./AuthContext"

// Hook personalizado que devuelve los datos y acciones de sesión desde cualquier componente
export const useAuth = () => {
    return useContext(AuthContext)
}
