# Informe de Código y Desarrollo — Sistema de Gestión Académica (SGA)

* **Proyecto:** Sistema de Gestión Académica (SGA) — Programación IV (UTN FRRQ)
* **Tipo de Proyecto:** Tipo 1 (Académico / Práctica Técnica Full-Stack)
* **Magnitud:** Pequeño (~1.500 LOC)
* **Stack Principal:** Node.js + Express 5 + MongoDB (Mongoose 9) + React 19 (Vite + Material UI) + HTML5/CSS3/JS Vanilla
* **Versión Actual:** `1.2.0` (SemVer — §15.4)
* **Fecha de Inicio de Registro:** 04/11/2026 — 16:45

---

## 1. Registro de Cambios por Sesión

### Sesión 04/11/2026
- ✅ `[COMPLETADO]` **Auditoría integral de los 44 archivos del repositorio SGA y diagnóstico de conexión con MongoDB Compass** — Revisión completa de `raíz`, `backend/`, `frontend/` y `frontend-react/`.
   > 🤖 Asistido por: Antigravity (Alex) | Fecha: 04/11/2026 — 16:35
   > ⚠️ Ya implementado. No volver a generar.

- ✅ `[COMPLETADO]` **Blindaje de conexión a MongoDB y configuración de entorno en Backend** — Archivos: `backend/config/database.js` (líneas 1-32), `backend/server.js` (líneas 1-49), `backend/.env.example` (líneas 1-5) y respaldo en Bóveda Externa (`Carpeta para respaldos de envs\sga_.env`).
   > 🤖 Asistido por: Antigravity (Alex) | Fecha: 04/11/2026 — 16:40
   > ⚠️ Ya implementado. No volver a generar.

- ✅ `[COMPLETADO]` **Validaciones de esquemas Mongoose y manejo universal de errores (`try...catch` — §2.4) en Controladores** — Archivos: `backend/models/Alumno.js`, `backend/models/Docente.js`, `backend/models/Usuario.js`, `backend/controllers/alumnos.controller.js` (líneas 1-189), `backend/controllers/docentes.controller.js` (líneas 1-189) y `backend/controllers/authController.js` (líneas 1-59).
   > 🤖 Asistido por: Antigravity (Alex) | Fecha: 04/11/2026 — 16:42
   > ⚠️ Ya implementado. No volver a generar.

- ✅ `[COMPLETADO]` **Script de inicialización y poblado automático (Seed) para MongoDB Compass** — Archivo: `backend/crearUsuario.js` (líneas 1-99). Crea el usuario administrador (`admin@sga.com`), limpia la colección vacía `maestros` y puebla registros iniciales en `alumnos` y `docentes`.
   > 🤖 Asistido por: Antigravity (Alex) | Fecha: 04/11/2026 — 16:43
   > ⚠️ Ya implementado. No volver a generar.

- ✅ `[COMPLETADO]` **Reparación completa del Frontend Clásico y migración de Docentes a MongoDB (`fetch`)** — Archivos: `frontend/index.html`, `frontend/alumnos.html`, `frontend/docentes.html` (líneas 1-74), `frontend/CSS/estilos.css` (líneas 1-294), `frontend/JS/alumnos.js` (líneas 1-251) y `frontend/JS/docentes.js` (líneas 1-251).
   > 🤖 Asistido por: Antigravity (Alex) | Fecha: 04/11/2026 — 16:44
   > ⚠️ Ya implementado. No volver a generar.

- ✅ `[COMPLETADO]` **Finalización y corrección de vistas y componentes en Frontend React (MUI)** — Archivos: `frontend-react/index.html`, `frontend-react/src/main.jsx`, `frontend-react/src/App.jsx`, `frontend-react/src/components/Header.jsx`, `frontend-react/src/pages/Login.jsx` (líneas 1-130), `frontend-react/src/components/FormularioA.jsx`, `frontend-react/src/components/FormularioD.jsx`, `frontend-react/src/components/ListaAlumnos.jsx`, `frontend-react/src/components/ListaDocentes.jsx`, `frontend-react/src/pages/Docentes.jsx` y `frontend-react/src/pages/FAQ.jsx`.
   > 🤖 Asistido por: Antigravity (Alex) | Fecha: 04/11/2026 — 16:46
   > ⚠️ Ya implementado. No volver a generar.

`[Modificado: 04/11/2026 — 16:47]`

---

## 2. Estado Actual de Archivos

| Archivo | Capa | Estado | Última Modificación |
|---|---|---|---|
| `package.json` / `.gitignore` / `README.md` | Raíz | ✅ Completo | 04/11/2026 — 16:45 |
| `backend/config/database.js` | Backend | ✅ Completo | 04/11/2026 — 16:40 |
| `backend/server.js` | Backend | ✅ Completo | 04/11/2026 — 16:40 |
| `backend/models/Alumno.js` | Backend | ✅ Completo | 04/11/2026 — 16:40 |
| `backend/models/Docente.js` | Backend | ✅ Completo | 04/11/2026 — 16:40 |
| `backend/models/Usuario.js` | Backend | ✅ Completo | 04/11/2026 — 16:40 |
| `backend/controllers/alumnos.controller.js` | Backend | ✅ Completo | 04/11/2026 — 16:41 |
| `backend/controllers/docentes.controller.js` | Backend | ✅ Completo | 04/11/2026 — 16:41 |
| `backend/controllers/authController.js` | Backend | ✅ Completo | 04/11/2026 — 16:41 |
| `backend/routes/*.js` | Backend | ✅ Completo | 04/11/2026 — 16:41 |
| `backend/crearUsuario.js` / `pruebas.http` | Backend | ✅ Completo | 04/11/2026 — 16:43 |
| `frontend/index.html` / `alumnos.html` / `docentes.html` | Frontend Clásico | ✅ Completo | 04/11/2026 — 16:43 |
| `frontend/CSS/estilos.css` | Frontend Clásico | ✅ Completo | 04/11/2026 — 16:43 |
| `frontend/JS/alumnos.js` / `docentes.js` / `ui.js` | Frontend Clásico | ✅ Completo | 04/11/2026 — 16:43 |
| `frontend-react/src/App.jsx` / `main.jsx` / `tema.js` | Frontend React | ✅ Completo | 04/11/2026 — 16:45 |
| `frontend-react/src/pages/Inicio.jsx` / `Alumnos.jsx` / `Docentes.jsx` / `FAQ.jsx` / `Login.jsx` | Frontend React | ✅ Completo | 04/11/2026 — 16:45 |
| `frontend-react/src/components/Header.jsx` / `Footer.jsx` / `FormularioA.jsx` / `FormularioD.jsx` / `ListaAlumnos.jsx` / `ListaDocentes.jsx` | Frontend React | ✅ Completo | 04/11/2026 — 16:45 |

`[Modificado: 04/11/2026 — 16:47]`

---

## 3. Auditoría de Código (Sección 6)

### Sección A — Hallazgos (Fallos, Errores y Vulnerabilidades)

| # | Tipo | Severidad | Descripción |
|---|---|---|---|
| **1** | `[INCOMPATIBILIDAD]` | **Alta** | Las carpetas `backend/node_modules` y `frontend-react/node_modules` no estaban instaladas; solo existía un `node_modules` incompleto en la raíz `SGA/` con `dotenv` y `mongoose`. |
| **2** | `[ERROR]` | **Alta** | `dotenv.config()` en `backend/server.js` y `backend/crearUsuario.js` usaba ruta implícita y fallaba si se ejecutaba desde la raíz `SGA/`. |
| **3** | `[INCONSISTENCIA]` | **Alta** | En MongoDB Compass existía la colección vacía `maestros`, mientras que el modelo `Docente.js` de Mongoose opera sobre la colección `docentes`. |
| **4** | `[ERROR]` / `[VULNERABILIDAD]` | **Alta** | Los 10 controladores de `alumnos.controller.js` y `docentes.controller.js` carecían de bloques `try...catch` (§2.4) y tenían typos `"no econtrado"`. |
| **5** | `[ERROR]` | **Alta** | `frontend/docentes.html` estaba truncado sin `<main>`, tenía `<link css="stylesheet">` inválido, y `frontend/JS/docentes.js` seguía utilizando `localStorage` en lugar de `fetch` a MongoDB. |
| **6** | `[ERROR]` | **Alta** | `frontend-react/src/pages/Login.jsx` tenía la URL mal escrita (`http:localhost:3000/auth/login`), carecía de `return` JSX y no estaba enrutado en `App.jsx` ni en `Header.jsx`. |
| **7** | `[ERROR]` | **Media** | `frontend/JS/alumnos.js` tenía un comentario `//` dentro del template HTML del `<button>` (línea 118) y `frontend/alumnos.html` usaba `type="texto"`. |
| **8** | `[INCONSISTENCIA]` | **Media** | `ListaDocentes.jsx` mostraba *"Legajo"* en lugar de *"DNI"* y *"¿Seguro que querés eliminar este alumno?"*; `FAQ.jsx` tenía `xs={{mb: 1}}` en vez de `sx={{ mb: 1 }}`. |

### Sección B — Correcciones Aplicadas

1. **Dependencias y Scripts de Monorepo (`SGA/package.json`, `backend/`, `frontend-react/`):**
   - **Qué se corrigió:** Se eliminó el `node_modules` huérfano de la raíz, se configuraron scripts puente en `SGA/package.json` (`dev`, `start`, `seed`, `frontend`, `build`) y se instalaron las dependencias completas en `backend/` y `frontend-react/`.
   - **Por qué:** Garantiza que `express`, `mongoose`, `bcrypt`, `cors`, `react` y `@mui/material` estén disponibles en sus respectivos paquetes.
2. **Conexión a MongoDB y Controladores (`backend/config/database.js`, `backend/server.js`, `backend/controllers/*.js`):**
   - **Qué se corrigió:** Se fijó `dotenv.config({ path: path.join(__dirname, ".env") })`, se envolvió cada controlador en `try...catch` con JSDoc, se corrigieron los mensajes 404 y se estandarizó la colección `docentes` mediante `backend/crearUsuario.js`.
   - **Por qué:** Cumple con la tolerancia a fallos (§2.4) y asegura que MongoDB Compass refleje inmediatamente las colecciones `alumnos`, `docentes` y `usuarios`.
3. **Frontend Clásico y Frontend React (`frontend/` y `frontend-react/`):**
   - **Qué se corrigió:** Se completó `docentes.html` y se migró `docentes.js` a `fetch("http://localhost:3000/docentes")`; se completó la UI de `Login.jsx` y se corrigieron las validaciones, etiquetas y estados de edición en `FormularioA.jsx`, `FormularioD.jsx`, `ListaAlumnos.jsx`, `ListaDocentes.jsx` y `FAQ.jsx`.
   - **Por qué:** Permite gestionar el CRUD completo de alumnos y docentes y el login de usuarios contra MongoDB desde cualquiera de las dos interfaces.

`[Modificado: 04/11/2026 — 16:47]`

---

## 4. Próximos Pasos

- ⬜ `[PENDIENTE]` Implementar el módulo de **Materias** y **Cursos** (modelos Mongoose, controladores, rutas y vistas en React).
- ⬜ `[PENDIENTE]` Proteger rutas de creación/edición/borrado en el Backend mediante JWT o sesiones tras el login.

---

## 5. Notas y Observaciones

- En **Windows PowerShell**, dado que la política de ejecución local bloquea `npm.ps1`, si deseas ejecutar comandos `npm` desde PowerShell puedes usar `npm.cmd run dev` o abrir una terminal `Command Prompt (cmd)` / `Git Bash`.
- Se conservaron intactos los archivos de práctica de clases (`frontend/JS/asincronia.js`, `frontend/JS/storage.js` y `frontend-react/src/components/ejemplos/`) para preservar el material académico de la materia (§1.3.D).

`[Modificado: 04/11/2026 — 16:47]`
