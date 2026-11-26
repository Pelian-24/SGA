// Importa las herramientas de enrutamiento de React Router
import { Routes, Route } from "react-router-dom"
// Importa la plantilla general (encabezado, contenido y pie de página)
import LayoutPpal from "./layouts/LayoutPpal"
// Importa las páginas principales de cada módulo del SGA
import Inicio from "./pages/Inicio"
import Alumnos from "./pages/Alumnos"
import Docentes from "./pages/Docentes"
import Materias from "./pages/Materias"
import { FAQ } from "./pages/FAQ"
import Login from "./pages/Login"
// Importa el componente protector que exige sesión iniciada para acceder al sistema
import RutaProtegida from "./components/RutaProtegida"

// Componente raíz encargado de declarar todas las rutas públicas y protegidas del SGA
function App() {
    return (
        <Routes>
            {/* Ruta pública de inicio de sesión */}
            <Route path="/login" element={<Login />} />

            {/* Bloque de rutas protegidas: exige un token JWT válido */}
            <Route element={<RutaProtegida />}>
                {/* Layout principal compartido por todas las pantallas internas */}
                <Route path="/" element={<LayoutPpal />}>
                    {/* Página de inicio en la ruta raíz "/" */}
                    <Route index element={<Inicio />} />
                    {/* Módulo de gestión de alumnos */}
                    <Route path="alumnos" element={<Alumnos />} />
                    {/* Módulo de gestión de docentes */}
                    <Route path="docentes" element={<Docentes />} />
                    {/* Módulo de gestión de materias */}
                    <Route path="materias" element={<Materias />} />
                    {/* Sección de preguntas frecuentes y ayuda */}
                    <Route path="ayuda" element={<FAQ />} />
                </Route>
            </Route>
        </Routes>
    )
}

// Exporta App para ser renderizado en main.jsx
export default App
