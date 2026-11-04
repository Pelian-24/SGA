/**
 * @copyright 2026 EG Industries. Todos los derechos reservados.
 * @license MIT — Ver archivo LICENSE en la raíz del proyecto.
 *
 * Este archivo es parte de Sistema de Gestión Académica (SGA).
 */

import { Routes, Route } from "react-router-dom"
import LayoutPpal from "./layouts/LayoutPpal"
import Inicio from "./pages/Inicio"
import Alumnos from "./pages/Alumnos"
import Docentes from "./pages/Docentes"
import { FAQ } from "./pages/FAQ"
import Login from "./pages/Login"

// ENRUTADOR PRINCIPAL: Define las rutas anidadas bajo el diseño general (LayoutPpal)
function App() {
    return (
        <Routes>
            <Route path="/" element={<LayoutPpal />}>
                <Route index element={<Inicio />} />
                <Route path="alumnos" element={<Alumnos />} />
                <Route path="docentes" element={<Docentes />} />
                <Route path="ayuda" element={<FAQ />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default App
