document.addEventListener("DOMContentLoaded", function () {
    if (sesionActual) {
        document.getElementById("saludoAdmin").textContent= "¡Hola " + sesionActual.nombre + "!";
    }
 
    document.getElementById("totalProductos").textContent= obtenerProductos().length;
 
    const totalUsuarios= document.getElementById("totalUsuarios");
    if (totalUsuarios) {
        totalUsuarios.textContent= obtenerUsuarios().length;
    }
});