// Importa las reglas base recomendadas de JavaScript para ESLint
import js from "@eslint/js"
// Importa las variables globales estándar del navegador (window, document, fetch, etc.)
import globals from "globals"
// Importa el plugin que valida el uso correcto de hooks de React
import reactHooks from "eslint-plugin-react-hooks"
// Importa el plugin que valida exportaciones compatibles con Vite Fast Refresh
import reactRefresh from "eslint-plugin-react-refresh"
// Importa helpers de configuración plana de ESLint
import { defineConfig, globalIgnores } from "eslint/config"

// Exporta la configuración de análisis estático para el frontend React
export default defineConfig([
    // Ignora la carpeta de compilación generada automáticamente
    globalIgnores(["dist"]),
    {
        // Aplica estas reglas a todos los archivos JS y JSX del frontend
        files: ["**/*.{js,jsx}"],
        // Combina las configuraciones recomendadas de JS, React Hooks y React Refresh
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        // Configura el entorno de navegador y habilita el análisis sintáctico de JSX
        languageOptions: {
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
    },
])
