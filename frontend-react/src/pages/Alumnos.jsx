// Importa useState para controlar el refresco de la lista y el alumno en edición
import { useState } from "react"
// Importa el listado de alumnos
import { ListaAlumnos } from "../components/ListaAlumnos"
// Importa el formulario de alta y edición de alumnos
import FormularioA from "../components/FormularioA"
// Importa useAuth para verificar si el usuario conectado tiene rol administrador
import { useAuth } from "../context/useAuth"

// Página del módulo Alumnos: coordina el formulario (solo admin) y el listado general
export default function Alumnos() {
    // Contador que dispara la recarga del listado cuando se crea, edita o elimina un alumno
    const [actualizar, setActualizar] = useState(0)
    // Almacena el alumno seleccionado para editar o null si se está cargando uno nuevo
    const [alumnoEditar, setAlumnoEditar] = useState(null)
    // Obtiene los datos del usuario autenticado desde el contexto global
    const { usuario } = useAuth()

    // Incrementa el contador de recarga y sale del modo edición
    function alumnoCreado() {
        setActualizar(valor => valor + 1)
        setAlumnoEditar(null)
    }

    // Guarda el alumno elegido para precargar sus datos en el formulario
    function seleccionarAlumno(alumno) {
        setAlumnoEditar(alumno)
    }

    return (
        <>
            {/* Muestra el formulario de alta/edición únicamente si el usuario tiene rol "admin" */}
            {usuario?.rol === "admin" && (
                <FormularioA
                    key={alumnoEditar?.legajo ?? "nuevo"}
                    onAlumnoCreado={alumnoCreado}
                    alumnoEditar={alumnoEditar}
                    onCancelar={() => setAlumnoEditar(null)}
                />
            )}

            {/* Listado visible para todos los usuarios autenticados (las acciones dependen del rol) */}
            <ListaAlumnos
                actualizar={actualizar}
                onAlumnoCreado={alumnoCreado}
                onEditarAlumno={seleccionarAlumno}
            />
        </>
    )
}
