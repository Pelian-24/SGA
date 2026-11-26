// Importa useState para modificar dinámicamente el tamaño de fuente de un párrafo
import { useState } from "react"

// Componente de práctica de clase: permite elegir tamaño de texto pequeño, mediano o grande
function TamanioTexto() {
    // Estado que guarda el valor CSS de fontSize actual
    const [tamanio, setTamanio] = useState("12px")

    return (
        <>
            {/* Párrafo al que se aplica el tamaño de fuente elegido */}
            <p style={{ fontSize: tamanio }}>
                Sistema de Gestión Académico
            </p>
            {/* Botonera para seleccionar los distintos tamaños predefinidos */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px"
                }}
            >
                <button onClick={() => setTamanio("14px")}>
                    Pequeño
                </button>
                <button onClick={() => setTamanio("20px")}>
                    Mediano
                </button>
                <button onClick={() => setTamanio("26px")}>
                    Grande
                </button>
            </div>
        </>
    )
}

// Exporta el componente de práctica
export default TamanioTexto
