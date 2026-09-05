function formatearPrecio(precio){
    return "$" + Number(precio).toLocaleString("es-CL");
}

function tablaProductos(){
    const productos= obtenerProductos();
    const tabla= document.getElementById("TablaProductos");
    const mensajeVacio= document.getElementById("sinProductos");

    tabla.innerHTML= "";

    productos.forEach(function (producto) {
        const stockBajo= producto.stockCritico!== undefined &&
                         producto.stockCritico!== null &&
                         producto.stock<= producto.stockCritico;
 
        const fila = document.createElement("tr");
        fila.innerHTML =
            "<td>"+ producto.codigo + "</td>" +
            "<td>"+ producto.nombre + "</td>" +
            "<td>"+ producto.categoria + "</td>" +
            "<td>"+ formatearPrecio(producto.precio) + "</td>" +
            "<td>"+ producto.stock + (stockBajo ? ' <span class="badge bg-danger">Stock bajo</span>' : "") + "</td>"+
            "<td>"+ (producto.stockCritico!== undefined && producto.stockCritico!== null ? producto.stockCritico: "-")+ "</td>" +
            '<td class="text-end">'+
                '<a href="producto-editar.html?id='+ producto.id + '" class="btn btn-sm btn-outline-primary me-2">Editar</a>' +
                '<button type="button" class="btn btn-sm btn-outline-danger" data-id="'+ producto.id + '">Eliminar</button>' +
            "</td>";
        tabla.appendChild(fila);
    });
 
    tabla.querySelectorAll("button[data-id]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const id = boton.getAttribute("data-id");
            const producto = obtenerProductoPorId(id);
            const confirmar = confirm('¿Eliminar el producto "'+ producto.nombre + '"? Esta acción no se puede deshacer.');
            if (confirmar) {
                eliminarProducto(id);
                tablaProductos();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", tablaProductos);