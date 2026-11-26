// Importa useState para cambiar dinámicamente el título mostrado en pantalla
import { useState } from "react"

// Componente de práctica de clase: cambia un título al hacer clic en distintos botones
function CambiarTitulo() {
    // Estado que guarda el texto del encabezado actual
    const [titulo, setTitulo] = useState("Inicio")

    return (
        <>
            {/* Encabezado actualizado según el botón presionado */}
            <h2>{titulo}</h2>
            {/* Contenedor con botones para alternar el valor del estado */}
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                <button
                    onClick={() => setTitulo("Alumnos")}
                    style={{
                        fontSize: "20px",
                        color: "lightgreen",
                        padding: "5px"
                    }}
                >
                    Alumnos
                </button>
                <button
                    onClick={() => setTitulo("Docentes")}
                    style={{
                        fontSize: "20px",
                        color: "lightgreen",
                        padding: "5px"
                    }}
                >
                    Docentes
                </button>
            </div>
        </>
    )
}

// Exporta el componente de práctica
export default CambiarTitulo
