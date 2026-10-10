const USUARIOS_KEY = 'aquaT_admin_usuarios'

const usuariosPorDefecto = [
  {
    id: 1,
    run: '211567899',
    nombre: 'Iván',
    apellidos: 'Rivera',
    correo: 'ivan.rivera@duoc.cl',
    contrasena: '123456',
    telefono: '',
    fechaNacimiento: '2002-10-25',
    tipoUsuario: 'Administrador',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: 'Lomas Ticas 123'
  },
  {
    id: 2,
    run: '128493456',
    nombre: 'Jose',
    apellidos: 'Cornejo',
    correo: 'jose.cornejo@gmail.com',
    contrasena: '123456',
    telefono: '',
    fechaNacimiento: '1998-11-02',
    tipoUsuario: 'Vendedor',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Puente Alto',
    direccion: 'Puente Asalto 456'
  },
  {
    id: 3,
    run: '205671234',
    nombre: 'Jose',
    apellidos: 'Cisternas',
    correo: 'jose.cisternas@gmail.com',
    contrasena: '123456',
    telefono: '',
    fechaNacimiento: '2000-02-20',
    tipoUsuario: 'Cliente',
    region: 'Región del Biobío',
    comuna: 'Concepción',
    direccion: 'Lomas turbas 789'
  }
]

function inicializarUsuarios() {
  const guardados = localStorage.getItem(USUARIOS_KEY)

  if (guardados === null) {
    localStorage.setItem(
      USUARIOS_KEY,
      JSON.stringify(usuariosPorDefecto)
    )
  }
}

export function obtenerUsuarios() {
  inicializarUsuarios()

  try {
    return JSON.parse(
      localStorage.getItem(USUARIOS_KEY)
    ) || []
  } catch {
    return []
  }
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem(
    USUARIOS_KEY,
    JSON.stringify(usuarios)
  )
}

export function obtenerUsuarioPorCorreo(correo) {
  return obtenerUsuarios().find(
    usuario =>
      usuario.correo.toLowerCase() ===
      correo.trim().toLowerCase()
  )
}

export function correoExiste(correo) {
  return Boolean(
    obtenerUsuarioPorCorreo(correo)
  )
}

export function runExiste(run) {
  return obtenerUsuarios().some(
    usuario =>
      usuario.run.toUpperCase() ===
      run.trim().toUpperCase()
  )
}

function generarNuevoId(usuarios) {
  if (usuarios.length === 0) {
    return 1
  }

  return Math.max(
    ...usuarios.map(usuario => usuario.id)
  ) + 1
}

export function agregarUsuario(datosUsuario) {
  const usuarios = obtenerUsuarios()

  const nuevoUsuario = {
    id: generarNuevoId(usuarios),
    ...datosUsuario
  }

  usuarios.push(nuevoUsuario)

  guardarUsuarios(usuarios)

  return nuevoUsuario
}

export function validarCredenciales(
  correo,
  contrasena
) {
  const usuario =
    obtenerUsuarioPorCorreo(correo)

  if (!usuario) {
    return null
  }

  if (usuario.contrasena !== contrasena) {
    return null
  }

  return usuario
}

export function obtenerUsuarioPorId(id) {
  return obtenerUsuarios().find(
    usuario => usuario.id === Number(id)
  )
}

