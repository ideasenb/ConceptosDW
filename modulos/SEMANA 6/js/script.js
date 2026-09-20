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
const btnLimpiarStorage = document.getElementById("btnLimpiarStorage");

// Array con el historial de solicitudes guardadas en localStorage
let historialSolicitudes = JSON.parse(localStorage.getItem("historialSolicitudes")) || [];

// Al cargar la página, recuperamos lo que el usuario tenía y lo que estaba escribiendo
document.addEventListener("DOMContentLoaded", () => {
    // 1. Restaurar lo que estaba escribiendo en los inputs
    const nombreGuardado = localStorage.getItem("borradorNombre");
    const librosGuardados = localStorage.getItem("borradorLibros");
    if (nombreGuardado) inputNombre.value = nombreGuardado;
    if (librosGuardados) inputLibros.value = librosGuardados;

    // 2. Restaurar la última respuesta del array si existe
    const ultimoResultado = localStorage.getItem("ultimoResultado");
    if (ultimoResultado) {
        arrayResultadoTexto.textContent = ultimoResultado;
        contenedorRespuesta.style.display = "block";
    }

    // 3. Restaurar las filas de la tabla con lo que ya teníamos guardado
    if (historialSolicitudes.length > 0) {
        if (filaVacia) filaVacia.remove();

        historialSolicitudes.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="text-center fw-bold">${item.id}</td>
                <td><strong>${item.usuario}</strong></td>
                <td>${item.libros}</td>
                <td><code class="text-success fw-bold">${item.resultado}</code></td>
            `;
            tablaCuerpo.appendChild(fila);
        });

        contadorSolicitudes = historialSolicitudes.length;
    }
});

// Guardar en localStorage lo que el usuario va escribiendo en tiempo real
inputNombre.addEventListener("input", () => {
    localStorage.setItem("borradorNombre", inputNombre.value);
});

inputLibros.addEventListener("input", () => {
    localStorage.setItem("borradorLibros", inputLibros.value);
});

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

    // Mostrar el resultado en pantalla
    const arrayFormatoTexto = JSON.stringify(arrayModificado);
    arrayResultadoTexto.textContent = arrayFormatoTexto;
    contenedorRespuesta.style.display = "block";

    // Guardar el último resultado generado
    localStorage.setItem("ultimoResultado", arrayFormatoTexto);

    // quita la fila de "No hay solicitudes" si es la primera vez
    const filaAviso = document.getElementById("filaVacia");
    if (filaAviso) {
        filaAviso.remove();
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

    // Guardar la nueva solicitud en el historial de localStorage
    const nuevaSolicitud = {
        id: contadorSolicitudes,
        usuario: nombre,
        libros: listaLibros.join(", "),
        resultado: arrayFormatoTexto
    };
    historialSolicitudes.push(nuevaSolicitud);
    localStorage.setItem("historialSolicitudes", JSON.stringify(historialSolicitudes));

    // Limpiar formulario y borrar los borradores temporales de localStorage
    inputNombre.value = "";
    inputLibros.value = "";
    localStorage.removeItem("borradorNombre");
    localStorage.removeItem("borradorLibros");
    inputNombre.focus();
});

// Botón para limpiar todo el historial de localStorage
if (btnLimpiarStorage) {
    btnLimpiarStorage.addEventListener("click", () => {
        if (confirm("¿Deseas borrar todo el historial guardado?")) {
            localStorage.clear();
            location.reload();
        }
    });
}
