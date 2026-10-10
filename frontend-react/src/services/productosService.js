import {
  productos as productosBase
} from '../data/productos'

const PRODUCTOS_KEY = 'aquaT_productos'

export const categoriasProducto = [
  'Filtros',
  'Bombas',
  'Accesorios',
  'Piscinas',
  'Químicos'
]

function crearProductosIniciales() {

  return productosBase.map(
    (producto, index) => ({
      ...producto,

      codigo:
        producto.codigo ||
        `AQT-${String(index + 1)
          .padStart(3, '0')}`,

      stock:
        producto.stock ?? 20,

      stockCritico:
        producto.stockCritico ?? 5
    })
  )
}

function inicializarProductos() {

  const guardados =
    localStorage.getItem(
      PRODUCTOS_KEY
    )

  if (guardados === null) {

    localStorage.setItem(
      PRODUCTOS_KEY,
      JSON.stringify(
        crearProductosIniciales()
      )
    )
  }
}

export function obtenerProductos() {

  inicializarProductos()

  try {

    return JSON.parse(
      localStorage.getItem(
        PRODUCTOS_KEY
      )
    ) || []

  } catch {

    const iniciales =
      crearProductosIniciales()

    guardarProductos(iniciales)

    return iniciales
  }
}

export function guardarProductos(
  productos
) {

  localStorage.setItem(
    PRODUCTOS_KEY,
    JSON.stringify(productos)
  )

  window.dispatchEvent(
    new Event(
      'productosActualizados'
    )
  )

  return productos
}

export function obtenerProductoPorId(
  id
) {

  return obtenerProductos().find(
    producto =>
      String(producto.id) ===
      String(id)
  )
}

function generarNuevoId(
  productos
) {

  let numero = 1

  while (
    productos.some(
      producto =>
        producto.id ===
        `producto-${numero}`
    )
  ) {
    numero++
  }

  return `producto-${numero}`
}

export function agregarProducto(
  datosProducto
) {

  const productos =
    obtenerProductos()

  const nuevoProducto = {
    id:
      generarNuevoId(productos),

    ...datosProducto
  }

  productos.push(
    nuevoProducto
  )

  guardarProductos(productos)

  return nuevoProducto
}

export function actualizarProducto(
  id,
  datosActualizados
) {

  const productos =
    obtenerProductos()

  const indice =
    productos.findIndex(
      producto =>
        String(producto.id) ===
        String(id)
    )

  if (indice === -1) {
    return false
  }

  productos[indice] = {
    ...productos[indice],
    ...datosActualizados,
    id: productos[indice].id
  }

  guardarProductos(productos)

  return true
}

export function eliminarProducto(
  id
) {

  const productos =
    obtenerProductos().filter(
      producto =>
        String(producto.id) !==
        String(id)
    )

  guardarProductos(productos)

  return productos
}