//uso de unshift y push
function procesarSolicitud(solicitud) {

    const nombreUsuario = solicitud.shift();


    solicitud.unshift("Carné de socio");


    solicitud.push(nombreUsuario);


    return solicitud;
}

// Referencias a los elementos del DOM
const formulario = document.getElementById("formularioSolicitud");
const inputNombre = document.getElementById("nombreUsuario");
const inputLibros = document.getElementById("librosInput");
const contenedorRespuesta = document.getElementById("contenedorRespuesta");
const arrayInicialTexto = document.getElementById("arrayInicialTexto");
const arrayResultadoTexto = document.getElementById("arrayResultadoTexto");

// Evento al enviar el formulario
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const librosTexto = inputLibros.value.trim();

    if (!nombre || !librosTexto) {
        alert("Por favor completa el nombre y al menos un libro.");
        return;
    }

    // Convertimos la lista de libros separados por coma en un arreglo limpio
    const listaLibros = librosTexto
        .split(",")
        .map(libro => libro.trim())
        .filter(libro => libro.length > 0);

    if (listaLibros.length === 0) {
        alert("Por favor ingresa al menos un título de libro válido.");
        return;
    }

    // 1. Construcción del array inicial con el usuario y los libros
    const arrayInicial = [nombre, ...listaLibros];

    // 2. Procesamos una copia del array con la función requerida
    const arrayModificado = procesarSolicitud([...arrayInicial]);

    // 3. Mostramos ambos estados del array en pantalla
    arrayInicialTexto.textContent = JSON.stringify(arrayInicial);
    arrayResultadoTexto.textContent = JSON.stringify(arrayModificado);

    // Mostramos el contenedor con los resultados
    contenedorRespuesta.style.display = "block";
});
