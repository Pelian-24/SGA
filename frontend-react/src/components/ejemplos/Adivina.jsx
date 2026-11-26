// Importa useState para manejar el número elegido, el resultado y los contadores del juego
import { useState } from "react"

// Componente de práctica de clase: juego simple de adivinar un número entre 1 y 10
export function Adivina() {
    // Almacena el texto ingresado por el usuario en el input numérico
    const [seleccion, setSeleccion] = useState("")
    // Almacena el mensaje de resultado de la jugada actual
    const [resultado, setResultado] = useState("")
    // Define el color del texto del resultado (verde al ganar, rojo al perder o error)
    const [colorResultado, setColorResultado] = useState("")
    // Contadores de partidas ganadas, perdidas y totales
    const [ganadas, setGanadas] = useState(0)
    const [perdidas, setPerdidas] = useState(0)
    const [partidas, setPartidas] = useState(0)

    // Genera un número aleatorio del 1 al 10 y lo compara con el ingresado por el usuario
    function sortear() {
        const ganador = Math.floor(Math.random() * 10) + 1
        const elegido = Number(seleccion)

        // Incrementa el total de intentos realizados
        setPartidas(partidas + 1)

        // Valida que el usuario haya escrito un valor
        if (seleccion.trim() === "") {
            setResultado("Ingresá un número")
            setColorResultado("red")
            return
        }

        // Valida que el número esté dentro del rango permitido (1 a 10)
        if (elegido < 1 || elegido > 10) {
            setResultado("Ingresá un número entre 1 y 10")
            setColorResultado("red")
            return
        }

        // Compara el número elegido con el ganador y actualiza el marcador
        if (elegido === ganador) {
            setResultado(`Ganaste. Salió ${ganador} y elegiste ${elegido}`)
            setColorResultado("green")
            setGanadas(ganadas + 1)
        } else {
            setResultado(`Perdiste. Salió ${ganador} y elegiste ${elegido}`)
            setColorResultado("red")
            setPerdidas(perdidas + 1)
        }
    }

    return (
        <>
            {/* Título del ejercicio */}
            <h2>Adiviná el número</h2>
            {/* Input controlado para ingresar el número elegido */}
            <input
                type="number"
                value={seleccion}
                onChange={(e) => setSeleccion(e.target.value)}
            />
            {/* Botón que dispara el sorteo */}
            <button onClick={sortear}>Adivinar</button>
            {/* Mensaje con el resultado de la última jugada */}
            <p style={{ color: colorResultado }}>{resultado}</p>
            <hr />
            {/* Resumen acumulado de partidas */}
            <p>Partidas jugadas: {partidas}</p>
            <p>Ganadas: {ganadas}</p>
            <p>Perdidas: {perdidas}</p>
        </>
    )
}
