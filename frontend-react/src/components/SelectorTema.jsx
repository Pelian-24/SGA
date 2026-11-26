// Importa Box para centrar el interruptor dentro del encabezado
import Box from "@mui/material/Box"
// Importa el hook de Material UI que permite leer y cambiar entre modo claro y oscuro
import { useColorScheme } from "@mui/material/styles"
// Importa el switch personalizado con íconos de sol y luna
import MaterialUISwitch from "./MaterialUISwitch"

// Componente que controla el cambio de tema claro/oscuro de toda la aplicación
function SelectorTema() {
    // Obtiene el esquema de color activo y la función para actualizarlo
    const { mode, setMode } = useColorScheme()

    // Evita renderizar hasta que Material UI determine el modo inicial
    if (!mode) {
        return null
    }

    // Determina si el switch debe mostrarse activado (modo oscuro)
    const modoOscuro = mode === "dark"

    // Alterna el esquema de color según el estado marcado del switch
    function cambiarModo(event) {
        setMode(event.target.checked ? "dark" : "light")
    }

    return (
        // Contenedor flexible que alinea el interruptor en la barra de navegación
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0
        }}>
            {/* Switch accesible con etiqueta para lectores de pantalla */}
            <MaterialUISwitch
                checked={modoOscuro}
                onChange={cambiarModo}
                slotProps={{
                    input: {
                        "aria-label": "Cambiar entre modo claro y oscuro",
                    },
                }}
            />
        </Box>
    )
}

// Exporta SelectorTema para utilizarlo en el Header
export default SelectorTema
