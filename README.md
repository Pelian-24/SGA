# Sistema de Gestión Académica (SGA)

> **Un producto de EG Industries** — Proyecto desarrollado durante la materia **Programación IV** (UTN FRRQ).

---

## Descripción

El **Sistema de Gestión Académica (SGA)** es una aplicación web Full-Stack que permite administrar alumnos, docentes y autenticación de usuarios mediante una API REST en Node.js/Express conectada a **MongoDB** y consumida tanto desde un Frontend en **React + Material UI** como desde un Frontend clásico en HTML5/CSS3/JavaScript.

---

## Stack Tecnológico

| Capa | Tecnologías |
|---|---|
| **Frontend Principal (SPA)** | React 19, Vite 8, Material UI (MUI v9), React Router DOM v7 |
| **Frontend Clásico** | HTML5, CSS3 (Variables CSS + Responsive Mobile-First), JavaScript ES6+ (`fetch` API) |
| **Backend (API REST)** | Node.js, Express 5, CORS, Dotenv, Bcrypt |
| **Base de Datos** | MongoDB Community Server v9.0 + Mongoose 9 + MongoDB Compass |

---

## Estructura del Proyecto

```text
SGA/
├── backend/
│   ├── config/
│   │   └── database.js            # Conexión a MongoDB mediante Mongoose
│   ├── controllers/
│   │   ├── alumnos.controller.js  # Lógica CRUD de alumnos
│   │   ├── docentes.controller.js # Lógica CRUD de docentes
│   │   └── authController.js      # Autenticación con bcrypt
│   ├── models/
│   │   ├── Alumno.js              # Esquema y modelo de colección "alumnos"
│   │   ├── Docente.js             # Esquema y modelo de colección "docentes"
│   │   └── Usuario.js             # Esquema y modelo de colección "usuarios"
│   ├── routes/
│   │   ├── alumnos.routes.js
│   │   ├── docentes.routes.js
│   │   └── authRoutes.js
│   ├── .env.example               # Plantilla pública de variables de entorno
│   ├── crearUsuario.js            # Script de inicialización (seed) para MongoDB
│   ├── pruebas.http               # Casos de prueba para REST Client
│   └── server.js                  # Punto de entrada de la API REST (Puerto 3000)
├── frontend/                      # Interfaz clásica (HTML + CSS + JS Vanilla)
│   ├── CSS/estilos.css
│   ├── JS/
│   │   ├── alumnos.js
│   │   ├── docentes.js
│   │   └── ui.js
│   ├── index.html
│   ├── alumnos.html
│   └── docentes.html
└── frontend-react/                # Aplicación SPA en React + Vite + Material UI
    ├── src/
    │   ├── components/            # Header, Footer, FormularioA, FormularioD, ListaAlumnos, ListaDocentes, SelectorTema
    │   ├── layouts/LayoutPpal.jsx
    │   ├── pages/                 # Inicio, Alumnos, Docentes, FAQ, Login
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── tema.js
    └── package.json
```

---

## Cómo Ejecutar el Proyecto y Conectar con MongoDB Compass

1. **Conectar MongoDB Compass:**
   - Abrir **MongoDB Compass** y conectar a `mongodb://localhost:27017/`.
   - La base de datos utilizada es **`basededatos`** con las colecciones `alumnos`, `docentes` y `usuarios`.

2. **Inicializar datos de prueba en MongoDB (Seed):**
   ```bash
   npm run seed
   ```
   *(Crea el usuario `admin@sga.com` con clave `ClaveDePrueba123!` y registros iniciales en `alumnos` y `docentes`).*

3. **Iniciar el Servidor Backend (Puerto 3000):**
   ```bash
   npm run dev
   ```

4. **Iniciar el Frontend en React (Puerto 5173):**
   ```bash
   npm run frontend
   ```

---

## Autor y Aviso Legal

* **Autor:** Elian Gregoret — Programación IV.
* **Marca:** Un producto de **EG Industries**.
* **Copyright:** Copyright © 2026 EG Industries / Programación IV - FRRQ. Todos los derechos reservados. Ver archivo `LICENSE` en la raíz del proyecto.
* **Disclaimer:** Este software se proporciona "tal cual", sin garantías de ningún tipo, expresas ni implícitas.
