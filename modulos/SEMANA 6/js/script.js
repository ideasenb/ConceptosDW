//uso de unshift y push
function procesarSolicitud(solicitud) {

    const nombreUsuario = solicitud.shift();


    solicitud.unshift("Carné de socio");


    solicitud.push(nombreUsuario);


    return solicitud;
}

// Contador de solicitudes para la tabla
let contadorSolicitudes = 0;

// Manejo del formulario
const formulario = document.getElementById("formularioSolicitud");
const inputNombre = document.getElementById("nombreUsuario");
const inputLibros = document.getElementById("librosInput");
const contenedorRespuesta = document.getElementById("contenedorRespuesta");
const arrayResultadoTexto = document.getElementById("arrayResultadoTexto");
const tablaCuerpo = document.getElementById("tablaCuerpo");
const filaVacia = document.getElementById("filaVacia");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const librosTexto = inputLibros.value.trim();

    if (!nombre || !librosTexto) {
        alert("Por favor completa el nombre y al menos un libro.");
        return;
    }

    // Convertimos la cadena de libros separados por coma en un arreglo limpio
    const listaLibros = librosTexto
        .split(",")
        .map(libro => libro.trim())
        .filter(libro => libro.length > 0);

    if (listaLibros.length === 0) {
        alert("Por favor ingresa al menos un título de libro válido.");
        return;
    }

    // contrucción del array principal
    const arrayInicial = [nombre, ...listaLibros];

    // uso de la función procesarSolicitud
    const arrayModificado = procesarSolicitud([...arrayInicial]);

    // Mostrar el resultado
    const arrayFormatoTexto = JSON.stringify(arrayModificado);
    arrayResultadoTexto.textContent = arrayFormatoTexto;
    contenedorRespuesta.style.display = "block";

    // quita la fila de "No hay solicitudes" si es la primera vez
    if (filaVacia) {
        filaVacia.remove();
    }

    // datos de la tabla
    contadorSolicitudes++;
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="text-center fw-bold">${contadorSolicitudes}</td>
        <td><strong>${nombre}</strong></td>
        <td>${listaLibros.join(", ")}</td>
        <td><code class="text-success fw-bold">${arrayFormatoTexto}</code></td>
    `;
    tablaCuerpo.appendChild(fila);

    // Limpiar formulario para el siguiente ingreso
    inputNombre.value = "";
    inputLibros.value = "";
    inputNombre.focus();
});
