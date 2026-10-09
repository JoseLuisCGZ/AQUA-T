export function validarNombre(nombre) {
  const valor = nombre.trim()

  if (valor === '') {
    return 'Ingrese su Nombre'
  }

  if (valor.length > 100) {
    return 'El nombre no puede superar los 100 caracteres'
  }

  return ''
}

export function validarEmail(email) {
  const valor = email.trim()

  const dominiosPermitidos =
    /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

  if (valor === '') {
    return 'Ingrese su Email'
  }

  if (valor.length > 100) {
    return 'El email no puede superar los 100 caracteres'
  }

  if (!dominiosPermitidos.test(valor)) {
    return 'Solo dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com'
  }

  return ''
}

export function validarTelefono(telefono) {
  if (telefono.trim() === '') {
    return 'Ingrese su Teléfono'
  }

  return ''
}

export function validarCiudad(ciudad) {
  if (ciudad.trim() === '') {
    return 'Ingrese su Ciudad'
  }

  return ''
}

export function validarMensaje(mensaje) {
  const valor = mensaje.trim()

  if (valor === '') {
    return 'Ingrese su Mensaje'
  }

  if (valor.length > 500) {
    return 'El mensaje no debe superar los 500 caracteres'
  }

  return ''
}