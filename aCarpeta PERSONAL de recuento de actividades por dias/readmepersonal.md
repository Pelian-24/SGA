<!-- Primer index que hicimos en clase -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="JS/asincronia.js" defer></script>
    <link rel="stylesheet" href="style.css">
    <title>SGA</title>
</head>
<body>
    <header>
    <h1>Sistema de Gestion Académica</h1>

    <p>Este es un sistema de gestion academica para la universidad</p>
    
    </header>
    <main>
        <section class="formulario">
            <h2>Alta de Alumno</h2>
            <form id="formAlumno">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre"><br><br>

                <label for="carrera">Carrera</label>
                <input type="text" id="carrera"><br><br>

                <label for="correo">Correo Electronico</label>
                <input type="email" id="correo"><br><br>

                <button type="submit">Guardar</button>
            </form>
        </section>
        <section class="alumnos">
            <p id="mensaje"></p>
            <h2>Alumnos registrados</h2>
            <p id="cantidadAlumnos"></p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="listaAlumnos">

                </tbody>
            </table>
        </section>
    </main>
</body>
</html>

<!-- actividad del dia 10/08/2026 -->

<!-- Vimos la parte del local storage en clase mayormente y no escribimos cas codigo -->

<!-- fin del la actividad del dia 10/08/2026 -->