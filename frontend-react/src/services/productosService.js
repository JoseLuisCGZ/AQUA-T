const API_URL =
  'http://localhost:3001/api/productos'

export const categoriasProducto = [
  'Filtros',
  'Bombas',
  'Accesorios',
  'Piscinas',
  'Químicos'
]

function normalizarProducto(producto) {
  return {
    ...producto,

    precio:
      Number(producto.precio),

    precioAnterior:
      producto.precioAnterior === null ||
      producto.precioAnterior === undefined
        ? null
        : Number(producto.precioAnterior),

    stock:
      Number(producto.stock),

    stockCritico:
      producto.stockCritico === null ||
      producto.stockCritico === undefined
        ? null
        : Number(producto.stockCritico)
  }
}

async function procesarRespuesta(respuesta) {

  if (!respuesta.ok) {

    let mensaje =
      'Error al comunicarse con el servidor'

    try {

      const datos =
        await respuesta.json()

      if (datos.error) {
        mensaje = datos.error
      }

    } catch {
      // Conserva el mensaje general.
    }

    throw new Error(mensaje)
  }

  if (respuesta.status === 204) {
    return null
  }

  return respuesta.json()
}

export async function obtenerProductos() {

  const respuesta =
    await fetch(API_URL)

  const productos =
    await procesarRespuesta(respuesta)

  return productos.map(
    normalizarProducto
  )
}

export async function obtenerProductoPorId(id) {

  const respuesta =
    await fetch(
      `${API_URL}/${id}`
    )

  const producto =
    await procesarRespuesta(
      respuesta
    )

  return normalizarProducto(
    producto
  )
}

export async function agregarProducto(datosProducto) {

  const respuesta =
    await fetch(
      API_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(
            datosProducto
          )
      }
    )

  const resultado =
    await procesarRespuesta(
      respuesta
    )

  return obtenerProductoPorId(
    resultado.id
  )
}

export async function actualizarProducto(
  id,
  datosActualizados
) {

  const respuesta =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(
            datosActualizados
          )
      }
    )

  await procesarRespuesta(
    respuesta
  )

  return obtenerProductoPorId(
    id
  )
}

export async function eliminarProducto(id) {

  const respuesta =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: 'DELETE'
      }
    )

  await procesarRespuesta(
    respuesta
  )

  return true
}