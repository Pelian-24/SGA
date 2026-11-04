import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Paper from "@mui/material/Paper"

// PÁGINA DE PREGUNTAS FRECUENTES (FAQ): Guía rápida de uso del SGA con componentes Accordion de MUI
export function FAQ() {
    const id = React.useId()
    return (
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
            <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                Preguntas Frecuentes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Ayuda para utilizar el Sistema de Gestión Académica
            </Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-panel1-content`}
                    id={`${id}-panel1-header`}
                >
                    <Typography component="span" fontWeight={600}>
                        ¿Cómo se registra un alumno o un docente?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Desde la sección Alumnos o Docentes, completá todos los campos del formulario
                        (Legajo o DNI, nombre, carrera/especialidad y correo electrónico) y seleccioná Guardar.
                        Los datos se almacenarán directamente en MongoDB.
                    </Typography>
                </AccordionDetails>
            </Accordion>
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
                        Buscá el registro en el listado y seleccioná Editar. El formulario se completará
                        automáticamente con sus datos actuales para que puedas actualizarlos y guardar los cambios.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`${id}-panel3-content`}
                    id={`${id}-panel3-header`}
                >
                    <Typography component="span" fontWeight={600}>
                        ¿Puedo eliminar un alumno o docente?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sí. Desde el listado, seleccioná Eliminar. Antes de confirmar en el cuadro de diálogo,
                        verificá que estés trabajando con el registro correcto.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}
