// Importa useState para almacenar y alternar un mensaje de saludo
import { useState } from "react"

// Componente de práctica de clase: alterna entre dos mensajes al presionar el botón
function Mensaje() {
    // Estado inicial con el primer mensaje visible
    const [mensaje, setMensaje] = useState("Hola, alumno")

    // Alterna el estado entre los dos textos configurados
    function cambiarMensaje() {
        setMensaje(
            mensaje === "Hola, alumno"
                ? "Bienvenidos a Programación IV"
                : "Hola, alumno"
        )
    }

    return (
        <>
            {/* Muestra el mensaje actual */}
            <h2>{mensaje}</h2>
            {/* Botón que dispara el cambio de texto */}
            <button onClick={cambiarMensaje}>Cambiar Mensaje</button>
        </>
    )
}

// Exporta el componente de práctica
export default Mensaje
