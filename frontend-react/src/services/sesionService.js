const SESION_KEY = 'aquaT_sesion'

export function guardarSesion(usuario) {

  const sesion = {
    id: usuario.id,
    correo: usuario.correo,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    tipoUsuario: usuario.tipoUsuario
  }

  sessionStorage.setItem(
    SESION_KEY,
    JSON.stringify(sesion)
  )

  window.dispatchEvent(
    new Event('sesionActualizada')
  )

  return sesion
}

export function obtenerSesion() {

  const datos =
    sessionStorage.getItem(SESION_KEY)

  if (!datos) {
    return null
  }

  try {
    return JSON.parse(datos)
  } catch {
    return null
  }
}

export function cerrarSesion() {

  sessionStorage.removeItem(SESION_KEY)

  window.dispatchEvent(
    new Event('sesionActualizada')
  )
}