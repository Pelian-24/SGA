import { useState } from "react"
import FormularioMateria from "../components/FormularioMateria"
import { ListaMaterias } from "../components/ListaMaterias"

export default function Materias() {
    const [actualizar, setActualizar] = useState(0)
    const [materiaEditar, setMateriaEditar] = useState(null)
    const [mensajeExito, setMensajeExito] = useState("")

    function materiaGuardada(mensaje) {
        setActualizar(valor => valor + 1)
        setMateriaEditar(null)
        setMensajeExito(mensaje || "")
    }

    function seleccionarMateria(materia) {
        setMensajeExito("")
        setMateriaEditar(materia)
    }

    function cancelarEdicion() {
        setMensajeExito("")
        setMateriaEditar(null)
    }

    return (
        <>
            <FormularioMateria
                key={materiaEditar?.codigo ?? "nueva"}
                onMateriaGuardada={materiaGuardada}
                materiaEditar={materiaEditar}
                onCancelar={cancelarEdicion}
                mensajeExito={mensajeExito}
                onLimpiarMensaje={() => setMensajeExito("")}
            />
            <ListaMaterias
                actualizar={actualizar}
                onMateriaEliminada={() => materiaGuardada("Materia eliminada correctamente")}
                onEditarMateria={seleccionarMateria}
            />
        </>
    )
}
