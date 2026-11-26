// Importa useState para controlar un contador numérico y la visibilidad de un texto
import { useState } from "react"

// Componente de práctica de clase: contador interactivo y renderizado condicional
function Incrementar() {
    // Almacena el valor numérico actual del contador
    const [contador, setContador] = useState(0)
    // Controla si el párrafo de información adicional está visible u oculto
    const [mostrar, setMostrar] = useState(false)

    // Suma 1 al contador
    function incremento() {
        setContador(contador + 1)
    }

    // Resta 1 al contador evitando valores negativos
    function decremento() {
        if (contador > 0) {
            setContador(contador - 1)
        }
    }

    return (
        <>
            {/* Muestra el valor actual del contador */}
            <h1>Contador: {contador}</h1>
            {/* Botones para incrementar y decrementar */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                <button
                    onClick={incremento}
                    style={{
                        width: "50px",
                        height: "40px",
                        fontSize: "20px"
                    }}
                >
                    +
                </button>
                <button
                    onClick={decremento}
                    style={{
                        width: "50px",
                        height: "40px",
                        fontSize: "20px"
                    }}
                >
                    -
                </button>
            </div>
            <br />
            {/* Botón que invierte el estado booleano "mostrar" */}
            <button onClick={() => setMostrar(!mostrar)}>
                Mostrar / Ocultar
            </button>
            {/* Renderiza el texto solo cuando "mostrar" es verdadero */}
            {mostrar && <p>Información visible</p>}
        </>
    )
}

// Exporta el componente de práctica
export default Incrementar
