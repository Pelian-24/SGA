// Importa createContext de React para compartir el estado de autenticación en toda la app
import { createContext } from "react"

// Crea y exporta el contexto global de autenticación (token, usuario y cierre de sesión)
export const AuthContext = createContext()
