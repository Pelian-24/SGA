// Importa StrictMode para detectar buenas prácticas y efectos secundarios en desarrollo
import { StrictMode } from "react"
// Importa createRoot para montar la aplicación React en el DOM
import { createRoot } from "react-dom/client"
// Importa el proveedor de temas de Material UI
import { ThemeProvider } from "@mui/material/styles"
// Importa CssBaseline para normalizar los estilos base del navegador
import CssBaseline from "@mui/material/CssBaseline"
// Importa BrowserRouter para habilitar la navegación SPA con React Router
import { BrowserRouter } from "react-router-dom"
// Importa la configuración personalizada de tema claro/oscuro
import tema from "./tema"
// Importa el componente raíz con la definición de rutas
import App from "./App"
// Importa el proveedor global de autenticación JWT y usuario
import AuthProvider from "./context/AuthProvider"

// Monta el árbol principal de proveedores y rutas dentro del elemento #root
createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* Habilita el enrutamiento del lado del cliente */}
        <BrowserRouter>
            {/* Aplica el tema claro/oscuro de Material UI siguiendo la preferencia del sistema */}
            <ThemeProvider theme={tema} defaultMode="system">
                {/* Reinicia márgenes y estilos globales según el tema activo */}
                <CssBaseline />
                {/* Comparte el estado de autenticación en toda la aplicación */}
                <AuthProvider>
                    {/* Renderiza las páginas y rutas configuradas */}
                    <App />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
)
