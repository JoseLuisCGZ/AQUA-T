const claveSesion= "aquaT_sesion";
 
function guardarSesion(usuario) {
    const sesion= {
        correo: usuario.correo,
        nombre: usuario.nombre,
        tipoUsuario: usuario.tipoUsuario
    };
    sessionStorage.setItem(claveSesion, JSON.stringify(sesion));
    return sesion;
}
 
function obtenerSesion() {
    const datos= sessionStorage.getItem(claveSesion);
    if (!datos) return null;
    try{
        return JSON.parse(datos);
    }catch (error){
        return null;
    }
}
 
function cerrarSesion() {
    sessionStorage.removeItem(claveSesion);
    window.location.href = arguments[0] || "../inicioSesion.html";
}

function requerirRol(rolesPermitidos) {
    const sesion= obtenerSesion();
 
    if (!sesion || !rolesPermitidos.includes(sesion.tipoUsuario)) {
        window.location.href= "../inicioSesion.html";
        return null;
    }
 
    return sesion;
}
 

function visibilidadPorRol(sesion) {
    if(!sesion) return;
 
    if(sesion.tipoUsuario!== "Administrador"){
        document.querySelectorAll("[data-solo-admin]").forEach(function (el) {
            el.style.display= "none";
        });
    }
}