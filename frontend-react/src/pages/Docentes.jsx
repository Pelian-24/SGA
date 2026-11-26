// Importa useState para controlar el refresco de la lista y el docente en edición
import { useState } from "react"
// Importa el listado de docentes
import { ListaDocentes } from "../components/ListaDocentes"
// Importa el formulario de alta y edición de docentes
import FormularioD from "../components/FormularioD"
// Importa useAuth para verificar si el usuario conectado tiene rol administrador
import { useAuth } from "../context/useAuth"

// Página del módulo Docentes: coordina el formulario (solo admin) y el listado general
export default function Docentes() {
    // Contador que dispara la recarga del listado cuando se crea, edita o elimina un docente
    const [actualizar, setActualizar] = useState(0)
    // Almacena el docente seleccionado para editar o null si se está cargando uno nuevo
    const [docenteEditar, setDocenteEditar] = useState(null)
    // Obtiene los datos del usuario autenticado desde el contexto global
    const { usuario } = useAuth()

    // Incrementa el contador de recarga y sale del modo edición
    function docenteCreado() {
        setActualizar(valor => valor + 1)
        setDocenteEditar(null)
    }

    // Guarda el docente elegido para precargar sus datos en el formulario
    function seleccionarDocente(docente) {
        setDocenteEditar(docente)
    }

    return (
        <>
            {/* Muestra el formulario de alta/edición únicamente si el usuario tiene rol "admin" */}
            {usuario?.rol === "admin" && (
                <FormularioD
                    key={docenteEditar?.dni ?? "nuevo"}
                    onDocenteCreado={docenteCreado}
                    docenteEditar={docenteEditar}
                    onCancelar={() => setDocenteEditar(null)}
                />
            )}

            {/* Listado visible para todos los usuarios autenticados (las acciones dependen del rol) */}
            <ListaDocentes
                actualizar={actualizar}
                onDocenteCreado={docenteCreado}
                onEditarDocente={seleccionarDocente}
            />
        </>
    )
}
