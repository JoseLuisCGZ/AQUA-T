export function validarCodigo(
  codigo
) {

  const valor = codigo.trim()

  if (valor === '') {
    return 'Ingrese el código del producto'
  }

  if (valor.length < 3) {
    return 'El código debe tener al menos 3 caracteres'
  }

  return ''
}

export function validarNombreProducto(
  nombre
) {

  const valor = nombre.trim()

  if (valor === '') {
    return 'Ingrese el nombre del producto'
  }

  if (valor.length > 100) {
    return 'El nombre no puede superar los 100 caracteres'
  }

  return ''
}

export function validarDescripcionProducto(
  descripcion
) {

  if (
    descripcion.trim().length >
    500
  ) {
    return 'La descripción no puede superar los 500 caracteres'
  }

  return ''
}

export function validarPrecioProducto(
  valor
) {

  if (
    valor === '' ||
    Number.isNaN(Number(valor))
  ) {
    return 'Ingrese un precio válido'
  }

  if (Number(valor) < 0) {
    return 'El precio no puede ser negativo (mínimo 0)'
  }

  return ''
}

export function validarStockProducto(
  valor
) {

  if (valor === '') {
    return 'Ingrese el stock disponible'
  }

  const stock = Number(valor)

  if (!Number.isInteger(stock)) {
    return 'El stock debe ser un número entero'
  }

  if (stock < 0) {
    return 'El stock no puede ser negativo'
  }

  return ''
}

export function validarStockCritico(
  valor
) {

  if (valor === '') {
    return ''
  }

  const stock = Number(valor)

  if (!Number.isInteger(stock)) {
    return 'El stock crítico debe ser un número entero'
  }

  if (stock < 0) {
    return 'El stock crítico no puede ser negativo'
  }

  return ''
}

export function validarCategoriaProducto(
  categoria
) {

  if (categoria === '') {
    return 'Seleccione una categoría'
  }

  return ''
}