// Componente de práctica inicial: muestra una tarjeta con datos de un alumno recibidos por props
function TarjetaAlumno({ nombre, carrera, edad }) {
    return (
        // Artículo semántico que presenta nombre, carrera y edad del alumno
        <article>
            <h2>{nombre}</h2>
            <p>{carrera}</p>
            <p>Edad: {edad}</p>
        </article>
    )
}

// Exporta el componente para practicar el paso de props en React
export default TarjetaAlumno
