/**
 * @copyright 2026 EG Industries. Todos los derechos reservados.
 * @license MIT — Ver archivo LICENSE en la raíz del proyecto.
 *
 * Este archivo es parte de Sistema de Gestión Académica (SGA).
 */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter } from "react-router-dom"
import tema from "./tema"
import App from "./App"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={tema} defaultMode="system">
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
)
