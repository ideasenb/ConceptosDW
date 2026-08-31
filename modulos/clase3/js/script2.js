// Función para guardar en Local Storage
function saveLocal() {
    const name = document.getElementById('localStorage').value;
    localStorage.setItem('localStorage', name);
    displayLocal();
}

// Función para mostrar datos desde Local Storage
function displayLocal() {
    const storedName = localStorage.getItem('localStorage');
    document.getElementById('localOutput').textContent = storedName ? `Nombre guardado en Local Storage: ${storedName}` : "No hay nombre guardado en Local Storage.";
}

// Función para guardar en Session Storage
function saveSession() {
    const name = document.getElementById('sessionStorage').value;
    sessionStorage.setItem('sessionStorage', name);
    displaySession();
}

// Función para mostrar datos desde Session Storage
function displaySession() {
    const storedName = sessionStorage.getItem('sessionStorage');
    document.getElementById('sessionOutput').textContent = storedName ? `Nombre guardado en Session Storage: ${storedName}` : "No hay nombre guardado en Session Storage.";
}

// Mostrar los datos al cargar la página    
window.onload = function() {
    displayLocal();
    displaySession();
};

