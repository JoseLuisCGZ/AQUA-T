const dominiosPermitidos =
  /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

export function validarEmailLogin(email) {

  const valor = email.trim()

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

export function validarContrasenaLogin(
  contrasena
) {

  if (contrasena === '') {
    return 'Ingrese una contraseña'
  }

  if (
    contrasena.length < 6 ||
    contrasena.length > 20
  ) {
    return 'La contraseña debe tener entre 6 y 20 caracteres'
  }

  return ''
}