document.addEventListener("DOMContentLoaded", function () {
    if (window.sesionActual) {
        document.getElementById("saludoAdmin").textContent= "¡Hola " + window.sesionActual.nombre + "!";
    }
 
    document.getElementById("totalProductos").textContent= obtenerProductos().length;
 
    const totalUsuariosEl= document.getElementById("totalUsuarios");
    if (totalUsuariosEl) {
        totalUsuariosEl.textContent= obtenerUsuarios().length;
    }
});