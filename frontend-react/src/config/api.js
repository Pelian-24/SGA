// Lee la URL base del backend desde las variables de entorno de Vite (con respaldo local)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

// Exporta la URL base para reutilizarla en todas las llamadas fetch del frontend
export default API_URL
