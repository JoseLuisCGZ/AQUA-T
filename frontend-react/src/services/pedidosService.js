const PEDIDOS_KEY = 'aquaT_pedidos'

export function obtenerPedidos() {
  try {
    return JSON.parse(
      localStorage.getItem(PEDIDOS_KEY)
    ) || []
  } catch {
    return []
  }
}

export function guardarPedidos(pedidos) {
  localStorage.setItem(
    PEDIDOS_KEY,
    JSON.stringify(pedidos)
  )
}

function generarId(pedidos) {
  if (pedidos.length === 0) {
    return 1
  }

  return Math.max(
    ...pedidos.map(pedido => pedido.id)
  ) + 1
}

export function crearPedido(datosPedido) {
  const pedidos = obtenerPedidos()

  const nuevoPedido = {
    id: generarId(pedidos),
    fecha: new Date().toISOString(),
    estado: 'Confirmado',
    ...datosPedido
  }

  pedidos.push(nuevoPedido)

  guardarPedidos(pedidos)

  return nuevoPedido
}