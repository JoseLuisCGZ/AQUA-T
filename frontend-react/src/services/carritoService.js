const CARRITO_KEY = 'aquaCarrito'
const CANTIDAD_MAXIMA = 20

export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CARRITO_KEY)) || []
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
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    })

  }

  guardarCarrito(carrito)

  return carrito
}

export function contarProductosCarrito() {
  return obtenerCarrito().reduce(
    (total, producto) =>
      total + producto.cantidad,
    0
  )
}