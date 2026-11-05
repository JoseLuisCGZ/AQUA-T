const dominiosPermitidos =
  /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

const soloTelefono =
  /^[0-9+\s-]{8,15}$/

const soloRun =
  /^[0-9]{6,8}[0-9kK]$/

export function calcularDvRun(numeroRun) {
  let suma = 0
  let multiplo = 2

  for (
    let i = numeroRun.length - 1;
    i >= 0;
    i--
  ) {
    suma +=
      parseInt(numeroRun[i], 10) * multiplo

    multiplo =
      multiplo < 7
        ? multiplo + 1
        : 2
  }

  const resto =
    11 - (suma % 11)

  if (resto === 11) return '0'
  if (resto === 10) return 'K'

  return resto.toString()
}

export function runValido(run) {
  if (!soloRun.test(run)) {
    return false
  }

  const numero =
    run.slice(0, -1)

  const dvIngresado =
    run.slice(-1).toUpperCase()

  const dvCalculado =
    calcularDvRun(numero)

  return dvIngresado === dvCalculado
}

export function validarRun(run) {
  const valor = run.trim()

  if (valor === '') {
    return 'Ingrese su RUN'
  }

  if (
    valor.length < 7 ||
    valor.length > 9
  ) {
    return 'El RUN debe tener entre 7 y 9 caracteres'
  }

  if (!runValido(valor)) {
    return 'El RUN ingresado no es válido (verifique el dígito verificador)'
  }

  return ''
}

export function validarNombreRegistro(nombre) {
  const valor = nombre.trim()

  if (valor === '') {
    return 'Ingrese su nombre'
  }

  if (valor.length > 50) {
    return 'El nombre no puede superar los 50 caracteres'
  }

  return ''
}

export function validarApellidos(apellidos) {
  const valor = apellidos.trim()

  if (valor === '') {
    return 'Ingrese sus apellidos'
  }

  if (valor.length > 100) {
    return 'Los apellidos no pueden superar los 100 caracteres'
  }

  return ''
}

export function validarCorreoRegistro(correo) {
  const valor = correo.trim()

  if (valor === '') {
    return 'Ingrese su correo'
  }

  if (valor.length > 100) {
    return 'El correo no puede superar los 100 caracteres'
  }

  if (!dominiosPermitidos.test(valor)) {
    return 'Solo dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com'
  }

  return ''
}

export function validarContrasena(contrasena) {
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

export function validarConfirmarContrasena(
  contrasena,
  confirmar
) {
  if (confirmar === '') {
    return 'Confirme su contraseña'
  }

  if (confirmar !== contrasena) {
    return 'Las contraseñas no coinciden'
  }

  return ''
}

export function validarTelefonoRegistro(telefono) {
  const valor = telefono.trim()

  if (
    valor !== '' &&
    !soloTelefono.test(valor)
  ) {
    return 'Ingrese un teléfono válido (solo números, 8 a 15 dígitos)'
  }

  return ''
}

export function validarFechaNacimiento(fecha) {
  if (fecha === '') {
    return ''
  }

  const hoy = new Date()
  const fechaIngresada = new Date(fecha)

  if (fechaIngresada > hoy) {
    return 'La fecha de nacimiento no puede ser futura'
  }

  return ''
}

export function validarRegion(region) {
  if (region === '') {
    return 'Seleccione una región'
  }

  return ''
}

export function validarComuna(comuna) {
  if (comuna === '') {
    return 'Seleccione una comuna'
  }

  return ''
}

export function validarDireccion(direccion) {
  const valor = direccion.trim()

  if (valor === '') {
    return 'Ingrese su dirección'
  }

  if (valor.length > 300) {
    return 'La dirección no puede superar los 300 caracteres'
  }

  return ''
}