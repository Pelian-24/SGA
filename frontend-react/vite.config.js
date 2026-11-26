// Importa el plugin oficial de React para compilar JSX y habilitar Fast Refresh en Vite
import react from "@vitejs/plugin-react"
// Importa el helper de configuración de Vite
import { defineConfig } from "vite"

// Exporta la configuración del servidor de desarrollo y compilación (https://vite.dev/config/)
export default defineConfig({
    // Registra el plugin de React en Vite
    plugins: [react()],
})
