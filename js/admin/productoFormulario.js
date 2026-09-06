const colorError = "#b3261e";
const colorExito = "#006494";
 
const idProductoEditar= new URLSearchParams(window.location.search).get("id");
const modoEdicion= idProductoEditar!== null;
 
function cargarCategoriasProducto() {
    const select= document.getElementById("categoria");
    categoriasProducto.forEach(function (categoria) {
        const option= document.createElement("option");
        option.value= categoria;
        option.textContent= categoria;
        select.appendChild(option);
    });
}
  
function validaCodigo() {
    const codigo= document.getElementById("codigo").value.trim();
    const feedback= document.getElementById("codigoFeedback");
    feedback.style.color= colorError;
 
    if (codigo=== ""){
        feedback.textContent= "Ingrese el código del producto";
        return false;
    }else if (codigo.length< 3){
        feedback.textContent= "El código debe tener al menos 3 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}
 
function validaNombreProducto() {
    const nombre= document.getElementById("nombre").value.trim();
    const feedback= document.getElementById("nombreFeedback");
    feedback.style.color= colorError;
 
    if (nombre=== ""){
        feedback.textContent= "Ingrese el nombre del producto";
        return false;
    }else if (nombre.length> 100){
        feedback.textContent= "El nombre no puede superar los 100 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}
 
function validaDescripcion() {
    const descripcion= document.getElementById("descripcion").value.trim();
    const feedback= document.getElementById("descripcionFeedback");
    feedback.style.color= colorError;
 
    if (descripcion.length> 500){
        feedback.textContent= "La descripción no puede superar los 500 caracteres";
        return false;
    }
    feedback.textContent= "";
    return true;
}
 
function validaPrecio() {
    const valor= document.getElementById("precio").value.trim();
    const feedback= document.getElementById("precioFeedback");
    feedback.style.color= colorError;
 
    const precio= parseFloat(valor);
 
    if (valor=== "" || isNaN(precio)) {
        feedback.textContent = "Ingrese un precio válido";
        return false;
    }else if (precio< 0){
        feedback.textContent = "El precio no puede ser negativo (mínimo 0)";
        return false;
    }
    feedback.textContent= "";
    return true;
}
 
function validaStock() {
    const valor= document.getElementById("stock").value.trim();
    const feedback= document.getElementById("stockFeedback");
    feedback.style.color= colorError;
 
    const stock= Number(valor);
 
    if (valor=== "" || isNaN(stock)) {
        feedback.textContent= "Ingrese el stock disponible";
        return false;
    }else if (!Number.isInteger(stock)) {
        feedback.textContent= "El stock debe ser un número entero";
        return false;
    }else if (stock < 0){
        feedback.textContent= "El stock no puede ser negativo";
        return false;
    }
    feedback.textContent= "";
    return true;
}
 
function validaStockCritico() {
    const valor= document.getElementById("stockCritico").value.trim();
    const feedback= document.getElementById("stockCriticoFeedback");
    feedback.style.color= colorError;
 
    if (valor=== ""){
        feedback.textContent= "";
        return true;
    }
 
    const stockCritico = Number(valor);
 
    if (isNaN(stockCritico) || !Number.isInteger(stockCritico)) {
        feedback.textContent= "El stock crítico debe ser un número entero";
        return false;
    }else if (stockCritico < 0){
        feedback.textContent= "El stock crítico no puede ser negativo";
        return false;
    }
    feedback.textContent= "";
    return true;
}
 
function validaCategoria() {
    const categoria= document.getElementById("categoria").value;
    const feedback= document.getElementById("categoriaFeedback");
    feedback.style.color = colorError;
 
    if (categoria=== ""){
        feedback.textContent= "Seleccione una categoría";
        return false;
    }
    feedback.textContent= "";
    return true;
}

function precargarProducto() {
    const producto= obtenerProductoPorId(idProductoEditar);
 
    if (!producto) {
        document.getElementById("mensajeForm").textContent= "No se encontró el producto solicitado.";
        document.getElementById("mensajeForm").style.color= colorError;
        document.getElementById("formProducto").style.display= "none";
        return;
    }
 
    document.getElementById("codigo").value= producto.codigo;
    document.getElementById("nombre").value= producto.nombre;
    document.getElementById("descripcion").value= producto.descripcion || "";
    document.getElementById("precio").value= producto.precio;
    document.getElementById("stock").value= producto.stock;
    document.getElementById("stockCritico").value= producto.stockCritico !== undefined && producto.stockCritico !== null ? producto.stockCritico : "";
    document.getElementById("categoria").value= producto.categoria;
    document.getElementById("imagen").value= producto.imagen || "";
 
    document.getElementById("tituloFormulario").textContent= "Editar producto";
    document.getElementById("botonGuardar").textContent= "Guardar cambios";
}
 
function validaFormProducto(event) {
 
    event.preventDefault();
 
    const mensajeForm= document.getElementById("mensajeForm");
 
    const codigoValido= validaCodigo();
    const nombreValido= validaNombreProducto();
    const descripcionValida= validaDescripcion();
    const precioValido= validaPrecio();
    const stockValido= validaStock();
    const stockCriticoValido= validaStockCritico();
    const categoriaValida= validaCategoria();
 
    if (!codigoValido){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color = colorError;
        return;
    }else if (!nombreValido){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else if (!descripcionValida){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else if (!precioValido){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else if (!stockValido){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else if (!stockCriticoValido){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else if (!categoriaValida){
        mensajeForm.textContent= "Ingrese la Informacion Faltante";
        mensajeForm.style.color= colorError;
        return;
    }else{
        const stockCriticoValor= document.getElementById("stockCritico").value.trim();
 
        const datosProducto= {
            codigo: document.getElementById("codigo").value.trim(),
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: parseFloat(document.getElementById("precio").value),
            stock: Number(document.getElementById("stock").value),
            stockCritico: stockCriticoValor=== "" ? null : Number(stockCriticoValor),
            categoria: document.getElementById("categoria").value,
            imagen: document.getElementById("imagen").value.trim()
        };
 
        if (modoEdicion){
            actualizarProducto(idProductoEditar, datosProducto);
            mensajeForm.textContent= "¡Producto actualizado con éxito! Redirigiendo...";
        }else{
            agregarProducto(datosProducto);
            mensajeForm.textContent= "¡Producto creado con éxito! Redirigiendo...";
        }
 
        mensajeForm.style.color= colorExito;
        mensajeForm.style.fontWeight= "600";
 
        setTimeout(function () {
            window.location.href= "admin_productos.html";
        }, 1200);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    cargarCategoriasProducto();
 
    if (modoEdicion){
        precargarProducto();
    }
 
    const form= document.getElementById("formProducto");
    form.addEventListener("submit", validaFormProducto);
 
    document.getElementById("codigo").addEventListener("input", validaCodigo);
    document.getElementById("nombre").addEventListener("input", validaNombreProducto);
    document.getElementById("descripcion").addEventListener("input", validaDescripcion);
    document.getElementById("precio").addEventListener("input", validaPrecio);
    document.getElementById("stock").addEventListener("input", validaStock);
    document.getElementById("stockCritico").addEventListener("input", validaStockCritico);
    document.getElementById("categoria").addEventListener("change", validaCategoria);
});