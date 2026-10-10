const CARRITO_KEY = 'aquaCarrito'
const CANTIDAD_MAXIMA = 20

export function obtenerCarrito() {
  try {
    return JSON.parse(
      localStorage.getItem(CARRITO_KEY)
    ) || []
  } catch {
    return []
  }
}

export function guardarCarrito(carrito) {

  localStorage.setItem(
    CARRITO_KEY,
    JSON.stringify(carrito)
  )

  window.dispatchEvent(
    new Event('carritoActualizado')
  )

  return carrito
}

export function agregarAlCarrito(producto) {

  const carrito = obtenerCarrito()

  const existente = carrito.find(
    item => item.id === producto.id
  )

  if (existente) {

    existente.cantidad = Math.min(
      existente.cantidad + 1,
      CANTIDAD_MAXIMA
    )

  } else {

    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      cantidad: 1
    })

  }

  return guardarCarrito(carrito)
}

export function actualizarCantidad(
  id,
  nuevaCantidad
) {

  const cantidad = Math.max(
    1,
    Math.min(
      CANTIDAD_MAXIMA,
      Number(nuevaCantidad) || 1
    )
  )

  const carrito =
    obtenerCarrito().map(item =>
      item.id === id
        ? {
            ...item,
            cantidad
          }
        : item
    )

  return guardarCarrito(carrito)
}

export function eliminarDelCarrito(id) {

  const carrito =
    obtenerCarrito().filter(
      item => item.id !== id
    )

  return guardarCarrito(carrito)
}


export function calcularSubtotal(carrito) {

  return carrito.reduce(
    (total, item) =>
      total +
      item.precio * item.cantidad,
    0
  )
}

export function contarProductosCarrito() {

  return obtenerCarrito().reduce(
    (total, producto) =>
      total + producto.cantidad,
    0
  )
}

export function formatearCLP(valor) {

  return '$' +
    Math.round(valor)
      .toLocaleString('es-CL')
}