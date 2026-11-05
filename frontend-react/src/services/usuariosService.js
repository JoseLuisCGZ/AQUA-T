const API_URL =
  'http://localhost:3001/api/usuarios'

export const tiposUsuario = [
  'Administrador',
  'Cliente',
  'Vendedor'
]

function normalizarUsuario(usuario) {

  return {
    ...usuario,

    id:
      Number(usuario.id),

    fechaNacimiento:
      usuario.fechaNacimiento
        ? String(
            usuario.fechaNacimiento
          ).slice(0, 10)
        : ''
  }
}

async function procesarRespuesta(
  respuesta
) {

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
      // Mantiene el mensaje general.
    }

    throw new Error(mensaje)
  }

  if (
    respuesta.status === 204
  ) {
    return null
  }

  return respuesta.json()
}

export async function obtenerUsuarios() {

  const respuesta =
    await fetch(API_URL)

  const usuarios =
    await procesarRespuesta(
      respuesta
    )

  return usuarios.map(
    normalizarUsuario
  )
}

export async function obtenerUsuarioPorId(
  id
) {

  const respuesta =
    await fetch(
      `${API_URL}/${id}`
    )

  const usuario =
    await procesarRespuesta(
      respuesta
    )

  return normalizarUsuario(
    usuario
  )
}

export async function obtenerUsuarioPorCorreo(
  correo
) {

  const usuarios =
    await obtenerUsuarios()

  return usuarios.find(
    usuario =>
      usuario.correo
        .toLowerCase() ===
      correo
        .trim()
        .toLowerCase()
  )
}

export async function correoExiste(
  correo,
  excluirId = null
) {

  const usuarios =
    await obtenerUsuarios()

  return usuarios.some(
    usuario =>
      usuario.correo
        .toLowerCase() ===
        correo
          .trim()
          .toLowerCase() &&
      (
        excluirId === null ||
        usuario.id !==
          Number(excluirId)
      )
  )
}

export async function runExiste(
  run,
  excluirId = null
) {

  const usuarios =
    await obtenerUsuarios()

  return usuarios.some(
    usuario =>
      usuario.run
        .toUpperCase() ===
        run
          .trim()
          .toUpperCase() &&
      (
        excluirId === null ||
        usuario.id !==
          Number(excluirId)
      )
  )
}

export async function validarCredenciales(
  correo,
  contrasena
) {

  const respuesta =
    await fetch(
      `${API_URL}/login`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify({
            correo,
            contrasena
          })
      }
    )

  const usuario =
    await procesarRespuesta(
      respuesta
    )

  return normalizarUsuario(
    usuario
  )
}

export async function agregarUsuario(
  datosUsuario
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
            datosUsuario
          )
      }
    )

  const resultado =
    await procesarRespuesta(
      respuesta
    )

  return obtenerUsuarioPorId(
    resultado.id
  )
}

export async function actualizarUsuario(
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

  return obtenerUsuarioPorId(
    id
  )
}

export async function eliminarUsuario(
  id
) {

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