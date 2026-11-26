// Componente de práctica inicial: renderiza un encabezado h1 con texto y color recibidos por props
function Titulo({ texto, color }) {
    return (
        // Aplica el color en línea y muestra el texto recibido
        <h1 style={{ color }}>{texto}</h1>
    )
}

// Exporta el componente para reutilizarlo en ejercicios básicos de React
export default Titulo
