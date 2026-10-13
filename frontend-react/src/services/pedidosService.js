const API_URL =
  'http://localhost:3001/api/pedidos'

async function procesarRespuesta(
  respuesta
) {

  if (!respuesta.ok) {

    let mensaje =
      'Error al procesar el pedido'

    try {

      const datos =
        await respuesta.json()

      if (datos.error) {
        mensaje = datos.error
      }

    } catch {
      // Mantiene el mensaje general.
    }

    throw new Error(mensaje)
  }

  if (respuesta.status === 204) {
    return null
  }

  return respuesta.json()
}

export async function obtenerPedidos() {

  const respuesta =
    await fetch(API_URL)

  return procesarRespuesta(
    respuesta
  )
}

export async function crearPedido(
  datosPedido
) {

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
            datosPedido
          )
      }
    )

  return procesarRespuesta(
    respuesta
  )
}