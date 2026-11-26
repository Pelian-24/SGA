// Importa useEffect y useState para suscribirse al evento resize del navegador
import { useEffect, useState } from "react"

// Componente de práctica de clase: muestra en tiempo real el ancho actual de la ventana
function Pantalla() {
    // Inicializa el estado con el ancho actual del viewport en píxeles
    const [ancho, setAncho] = useState(window.innerWidth)

    // Registra el listener del evento resize al montar y lo limpia al desmontar el componente
    useEffect(() => {
        const actualizarAncho = () => {
            setAncho(window.innerWidth)
        }
        window.addEventListener("resize", actualizarAncho)

        // Función de limpieza que evita fugas de memoria al desmontar
        return () => {
            window.removeEventListener("resize", actualizarAncho)
        }
    }, [])

    return (
        // Muestra el ancho medido en píxeles
        <h2>Ancho: {ancho} px</h2>
    )
}

// Exporta el componente de práctica
export default Pantalla
