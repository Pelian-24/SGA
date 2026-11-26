// Importa useState para manejar el refresco, la materia seleccionada y el mensaje de confirmación
import { useState } from "react"
// Importa el formulario de alta y edición de materias
import FormularioMateria from "../components/FormularioMateria"
// Importa el listado de materias registradas
import { ListaMaterias } from "../components/ListaMaterias"
// Importa useAuth para verificar si el usuario conectado tiene rol administrador
import { useAuth } from "../context/useAuth"

// Página del módulo Materias: coordina el formulario (solo admin) y el listado general
export default function Materias() {
    // Contador que fuerza la actualización de la lista tras crear, modificar o eliminar
    const [actualizar, setActualizar] = useState(0)
    // Almacena la materia elegida para editar o null en modo alta
    const [materiaEditar, setMateriaEditar] = useState(null)
    // Guarda el mensaje de éxito mostrado al guardar o eliminar una materia
    const [mensajeExito, setMensajeExito] = useState("")
    // Obtiene los datos del usuario autenticado desde el contexto global
    const { usuario } = useAuth()

    // Actualiza el listado, sale del modo edición y muestra el mensaje de confirmación
    function materiaGuardada(mensaje) {
        setActualizar(valor => valor + 1)
        setMateriaEditar(null)
        setMensajeExito(mensaje || "")
    }

    // Limpia el mensaje anterior y precarga la materia seleccionada en el formulario
    function seleccionarMateria(materia) {
        setMensajeExito("")
        setMateriaEditar(materia)
    }

    // Cancela la edición activa y limpia el mensaje de confirmación
    function cancelarEdicion() {
        setMensajeExito("")
        setMateriaEditar(null)
    }

    return (
        <>
            {/* Muestra el formulario de alta/edición únicamente si el usuario tiene rol "admin" */}
            {usuario?.rol === "admin" && (
                <FormularioMateria
                    key={materiaEditar?.codigo ?? "nueva"}
                    onMateriaGuardada={materiaGuardada}
                    materiaEditar={materiaEditar}
                    onCancelar={cancelarEdicion}
                    mensajeExito={mensajeExito}
                    onLimpiarMensaje={() => setMensajeExito("")}
                />
            )}

            {/* Listado visible para todos los usuarios autenticados (las acciones dependen del rol) */}
            <ListaMaterias
                actualizar={actualizar}
                onMateriaEliminada={() => materiaGuardada("Materia eliminada correctamente")}
                onEditarMateria={seleccionarMateria}
            />
        </>
    )
}
