// Importa React para usar el hook useId en los identificadores accesibles del acordeón
import * as React from "react"
// Importa componentes de acordeón y tipografía de Material UI
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Paper from "@mui/material/Paper"

// Página de Preguntas Frecuentes: guía rápida de uso para Alumnos, Docentes, Materias y roles
export function FAQ() {
    // Genera un prefijo único para asociar cada encabezado de acordeón con su contenido (accesibilidad)
    const id = React.useId()

    return (
        // Tarjeta contenedora de toda la sección de ayuda
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            {/* Título y subtítulo de la página */}
            <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                Preguntas Frecuentes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Ayuda para utilizar el Sistema de Gestión Académica
            </Typography>

            {/* Pregunta 1: Alta de registros */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-panel1-content`}
                    id={`${id}-panel1-header`}
                >
                    <Typography component="span" fontWeight={600}>
                        ¿Cómo se registra un alumno, un docente o una materia?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Ingresando con una cuenta de administrador, desde la sección Alumnos, Docentes o Materias
                        completá todos los campos obligatorios del formulario y seleccioná Guardar.
                        Los datos se almacenarán directamente en MongoDB.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Pregunta 2: Modificación de registros */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-panel2-content`}
                    id={`${id}-panel2-header`}
                >
                    <Typography component="span" fontWeight={600}>
                        ¿Cómo puedo modificar los datos de un registro?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Si tenés permisos de administrador, buscá el registro en el listado y seleccioná Editar.
                        El formulario se completará automáticamente con sus datos actuales para que puedas actualizarlos y guardar los cambios.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Pregunta 3: Eliminación de registros */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-panel3-content`}
                    id={`${id}-panel3-header`}
                >
                    <Typography component="span" fontWeight={600}>
                        ¿Puedo eliminar un alumno, docente o materia?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sí, con rol de administrador. Desde el listado, seleccioná Eliminar y confirmá
                        la acción en el cuadro de diálogo verificando que se trate del registro correcto.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Pregunta 4: Diferencia entre roles */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-panel4-content`}
                    id={`${id}-panel4-header`}
                >
                    <Typography component="span" fontWeight={600}>
                        ¿Por qué no veo los formularios o los botones de Editar y Eliminar?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        El sistema distingue entre usuarios administradores (rol admin) y usuarios de consulta (rol usuario).
                        Los usuarios de consulta pueden visualizar los listados, pero solo los administradores pueden crear, modificar o eliminar registros.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}
