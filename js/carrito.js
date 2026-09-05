const CARRITO_KEY = 'aquaCarrito';
const CANTIDAD_MAXIMA_POR_PRODUCTO = 20;

function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
        existente.cantidad = Math.min(existente.cantidad + 1, CANTIDAD_MAXIMA_POR_PRODUCTO);
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    return carrito;
}

function actualizarCantidad(id, nuevaCantidad) {
    let carrito = obtenerCarrito();
    nuevaCantidad = Math.max(1, Math.min(CANTIDAD_MAXIMA_POR_PRODUCTO, Number(nuevaCantidad) || 1));

    carrito = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );

    guardarCarrito(carrito);
    return carrito;
}

function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter((item) => item.id !== id);
    guardarCarrito(carrito);
    return carrito;
}

function vaciarCarrito() {
    guardarCarrito([]);
}

function calcularSubtotal(carrito) {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function formatearCLP(valor) {
    return '$' + Math.round(valor).toLocaleString('es-CL');
}

// Actualiza la burbuja con el número de artículos en TODAS las páginas
// (se llama sola al cargar cualquier página que incluya este script).
function actualizarContadorCarrito() {
    const badge = document.getElementById('contadorCarrito');
    if (!badge) return;

    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Engancha todos los botones "Añadir al carrito" que tengan la clase
// .btn-agregar-carrito y los atributos data-id, data-nombre, data-precio, data-imagen.
function inicializarBotonesAgregar() {
    document.querySelectorAll('.btn-agregar-carrito').forEach((boton) => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();

            agregarAlCarrito({
                id: boton.dataset.id,
                nombre: boton.dataset.nombre,
                precio: boton.dataset.precio,
                imagen: boton.dataset.imagen
            });

            const textoOriginal = boton.textContent;
            boton.textContent = 'Añadido ✓';
            boton.disabled = true;
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.disabled = false;
            }, 900);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    inicializarBotonesAgregar();
});