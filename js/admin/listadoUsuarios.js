function tipoDeRol(tipo){
    if(tipo=== "Administrador"){
        return "bg-primary";
    }else if(tipo=== "Vendedor"){
        return "bg-info text-dark";
    }else if(tipo=== "Cliente"){
        return "bg-secondary";
    }
}

function tablaUsuarios(){
    const usuarios= obtenerUsuarios();
    const tabla= document.getElementById("TablaUsuarios");
    const mensajeVacio= document.getElementById("sinUsuarios");
 
    tabla.innerHTML= "";
 
    if (usuarios.length=== 0) {
        mensajeVacio.style.display= "block";
        return;
    }
    mensajeVacio.style.display= "none";
 
    usuarios.forEach(function (usuario) {
        const fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + usuario.run + "</td>" +
            "<td>" + usuario.nombre + "</td>" +
            "<td>" + usuario.apellidos + "</td>" +
            "<td>" + usuario.correo + "</td>" +
            '<td><span class="badge ' + tipoDeRol(usuario.tipoUsuario) + '">' + usuario.tipoUsuario + "</span></td>" +
            "<td>" + (usuario.comuna || "-") + "</td>" +
            '<td class="text-end">' +
                '<a href="usuarioEditar.html?id=' + usuario.id + '" class="btn btn-sm btn-outline-primary me-2">Editar</a>' +
                '<button type="button" class="btn btn-sm btn-outline-danger" data-id="' + usuario.id + '">Eliminar</button>' +
            "</td>";
        tabla.appendChild(fila);
    });
 
    tabla.querySelectorAll("button[data-id]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const id= boton.getAttribute("data-id");
            const usuario= obtenerUsuarioPorId(id);
            const confirmar= confirm('¿Eliminar al usuario "' + usuario.nombre + " " + usuario.apellidos + '"? Esta acción no se puede deshacer.');
            if (confirmar){
                eliminarUsuario(id);
                tablaUsuarios();
            }
        });
    });
}
 
document.addEventListener("DOMContentLoaded", tablaUsuarios);