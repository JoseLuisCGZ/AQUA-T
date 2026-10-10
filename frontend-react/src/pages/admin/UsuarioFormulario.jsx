import {
  useEffect,
  useState
} from 'react'

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'

import AdminSidebar from '../../components/AdminSidebar'

import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  agregarUsuario,
  actualizarUsuario,
  tiposUsuario
} from '../../services/usuariosService'

import {
  regionesComunas
} from '../../data/regiones'

import {
  validarRun,
  validarNombreRegistro,
  validarApellidos,
  validarCorreoRegistro,
  validarContrasena,
  validarFechaNacimiento,
  validarRegion,
  validarComuna,
  validarDireccion
} from '../../utils/validacionesRegistro'

function UsuarioFormulario() {

  const { id } = useParams()

  const navigate =
    useNavigate()

  const modoEdicion =
    Boolean(id)

  const estadoInicial = {
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    fechaNacimiento: '',
    tipoUsuario: '',
    region: '',
    comuna: '',
    direccion: ''
  }

  const [formulario, setFormulario] =
    useState(estadoInicial)

  const [errores, setErrores] =
    useState({})

  const [mensaje, setMensaje] =
    useState('')

  const [usuarioEncontrado,
    setUsuarioEncontrado] =
    useState(true)

  useEffect(() => {

    if (!modoEdicion) {
      return
    }

    const usuario =
      obtenerUsuarioPorId(id)

    if (!usuario) {

      setUsuarioEncontrado(false)

      return
    }

    const indiceRegion =
      regionesComunas.findIndex(
        item =>
          item.region === usuario.region
      )

    setFormulario({
      run:
        usuario.run || '',

      nombre:
        usuario.nombre || '',

      apellidos:
        usuario.apellidos || '',

      correo:
        usuario.correo || '',

      contrasena: '',

      fechaNacimiento:
        usuario.fechaNacimiento || '',

      tipoUsuario:
        usuario.tipoUsuario || '',

      region:
        indiceRegion >= 0
          ? String(indiceRegion)
          : '',

      comuna:
        usuario.comuna || '',

      direccion:
        usuario.direccion || ''
    })

  }, [id, modoEdicion])

  const comunasDisponibles =
    formulario.region !== ''
      ? regionesComunas[
          Number(formulario.region)
        ].comunas
      : []

  function actualizarCampo(evento) {

    const {
      name,
      value
    } = evento.target

    if (name === 'region') {

      setFormulario(prev => ({
        ...prev,
        region: value,
        comuna: ''
      }))

      return
    }

    setFormulario(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function guardar(evento) {

    evento.preventDefault()

    const errorContrasena =
      modoEdicion &&
      formulario.contrasena === ''
        ? ''
        : validarContrasena(
            formulario.contrasena
          )

    const nuevosErrores = {

      run:
        validarRun(
          formulario.run
        ),

      nombre:
        validarNombreRegistro(
          formulario.nombre
        ),

      apellidos:
        validarApellidos(
          formulario.apellidos
        ),

      correo:
        validarCorreoRegistro(
          formulario.correo
        ),

      contrasena:
        errorContrasena,

      fechaNacimiento:
        validarFechaNacimiento(
          formulario.fechaNacimiento
        ),

      tipoUsuario:
        formulario.tipoUsuario === ''
          ? 'Seleccione un tipo de usuario'
          : '',

      region:
        validarRegion(
          formulario.region
        ),

      comuna:
        validarComuna(
          formulario.comuna
        ),

      direccion:
        validarDireccion(
          formulario.direccion
        )
    }

    setErrores(
      nuevosErrores
    )

    const hayErrores =
      Object.values(
        nuevosErrores
      ).some(
        error => error !== ''
      )

    if (hayErrores) {

      setMensaje(
        'Ingrese la Informacion Faltante'
      )

      return
    }

    const usuarios =
      obtenerUsuarios()

    const runDuplicado =
      usuarios.some(
        usuario =>
          usuario.run.toUpperCase() ===
            formulario.run
              .trim()
              .toUpperCase() &&
          usuario.id !== Number(id)
      )

    if (runDuplicado) {

      setErrores(prev => ({
        ...prev,
        run:
          'Este RUN ya está registrado'
      }))

      return
    }

    const correoDuplicado =
      usuarios.some(
        usuario =>
          usuario.correo
            .toLowerCase() ===
            formulario.correo
              .trim()
              .toLowerCase() &&
          usuario.id !== Number(id)
      )

    if (correoDuplicado) {

      setErrores(prev => ({
        ...prev,
        correo:
          'Este correo ya está registrado'
      }))

      return
    }

    const region =
      regionesComunas[
        Number(formulario.region)
      ].region

    const datos = {

      run:
        formulario.run
          .trim()
          .toUpperCase(),

      nombre:
        formulario.nombre.trim(),

      apellidos:
        formulario.apellidos.trim(),

      correo:
        formulario.correo
          .trim()
          .toLowerCase(),

      fechaNacimiento:
        formulario.fechaNacimiento,

      tipoUsuario:
        formulario.tipoUsuario,

      region,

      comuna:
        formulario.comuna,

      direccion:
        formulario.direccion.trim()
    }

    if (modoEdicion) {

      const usuarioActual =
        obtenerUsuarioPorId(id)

      actualizarUsuario(
        id,
        {
          ...datos,

          contrasena:
            formulario.contrasena !== ''
              ? formulario.contrasena
              : usuarioActual.contrasena,

          telefono:
            usuarioActual.telefono || ''
        }
      )

      setMensaje(
        '¡Usuario actualizado con éxito!'
      )

    } else {

      agregarUsuario({
        ...datos,

        contrasena:
          formulario.contrasena,

        telefono: ''
      })

      setMensaje(
        '¡Usuario creado con éxito!'
      )
    }

    setTimeout(() => {

      navigate(
        '/admin/usuarios'
      )

    }, 900)
  }

  if (!usuarioEncontrado) {

    return (
      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-contenido">

          <div className="admin-panel">

            <p className="text-danger">
              No se encontró el usuario solicitado.
            </p>

            <Link
              to="/admin/usuarios"
              className="btn btn-primary"
            >
              Volver
            </Link>

          </div>

        </main>

      </div>
    )
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-contenido">

        <div className="admin-header">

          <h1>
            {modoEdicion
              ? 'Editar usuario'
              : 'Nuevo usuario'}
          </h1>

          <Link
            to="/admin/usuarios"
            className="btn btn-outline-primary"
          >
            ← Volver al listado
          </Link>

        </div>

        <div className="admin-panel">

          <form
            onSubmit={guardar}
            noValidate
          >

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  RUN
                </label>

                <input
                  type="text"
                  name="run"
                  maxLength="9"
                  className="form-control"
                  value={formulario.run}
                  onChange={actualizarCampo}
                />

                <div className="campo-error">
                  {errores.run}
                </div>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  maxLength="50"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                />

                <div className="campo-error">
                  {errores.nombre}
                </div>

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Apellidos
                </label>

                <input
                  type="text"
                  name="apellidos"
                  maxLength="100"
                  className="form-control"
                  value={formulario.apellidos}
                  onChange={actualizarCampo}
                />

                <div className="campo-error">
                  {errores.apellidos}
                </div>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Correo
                </label>

                <input
                  type="email"
                  name="correo"
                  maxLength="100"
                  className="form-control"
                  value={formulario.correo}
                  onChange={actualizarCampo}
                />

                <div className="campo-error">
                  {errores.correo}
                </div>

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  name="contrasena"
                  maxLength="20"
                  className="form-control"
                  value={formulario.contrasena}
                  onChange={actualizarCampo}
                />

                <div className="form-text">

                  {modoEdicion
                    ? 'Déjala vacía para conservar la contraseña actual.'
                    : 'Entre 6 y 20 caracteres.'}

                </div>

                <div className="campo-error">
                  {errores.contrasena}
                </div>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Fecha de nacimiento
                </label>

                <input
                  type="date"
                  name="fechaNacimiento"
                  className="form-control"
                  value={
                    formulario.fechaNacimiento
                  }
                  onChange={actualizarCampo}
                />

                <div className="campo-error">
                  {errores.fechaNacimiento}
                </div>

              </div>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Tipo de usuario
              </label>

              <select
                name="tipoUsuario"
                className="form-select"
                value={
                  formulario.tipoUsuario
                }
                onChange={actualizarCampo}
              >

                <option value="">
                  -- Seleccione el tipo --
                </option>

                {tiposUsuario.map(
                  tipo => (

                    <option
                      key={tipo}
                      value={tipo}
                    >
                      {tipo}
                    </option>

                  )
                )}

              </select>

              <div className="campo-error">
                {errores.tipoUsuario}
              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Región
                </label>

                <select
                  name="region"
                  className="form-select"
                  value={formulario.region}
                  onChange={actualizarCampo}
                >

                  <option value="">
                    -- Seleccione la región --
                  </option>

                  {regionesComunas.map(
                    (item, index) => (

                      <option
                        key={item.region}
                        value={index}
                      >
                        {item.region}
                      </option>

                    )
                  )}

                </select>

                <div className="campo-error">
                  {errores.region}
                </div>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Comuna
                </label>

                <select
                  name="comuna"
                  className="form-select"
                  disabled={
                    formulario.region === ''
                  }
                  value={formulario.comuna}
                  onChange={actualizarCampo}
                >

                  <option value="">
                    -- Seleccione la comuna --
                  </option>

                  {comunasDisponibles.map(
                    comuna => (

                      <option
                        key={comuna}
                        value={comuna}
                      >
                        {comuna}
                      </option>

                    )
                  )}

                </select>

                <div className="campo-error">
                  {errores.comuna}
                </div>

              </div>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Dirección
              </label>

              <input
                type="text"
                name="direccion"
                maxLength="300"
                className="form-control"
                value={
                  formulario.direccion
                }
                onChange={actualizarCampo}
              />

              <div className="campo-error">
                {errores.direccion}
              </div>

            </div>

            {mensaje && (

              <div
                className="mb-3 fw-semibold"
                style={{
                  color:
                    mensaje.startsWith('¡')
                      ? 'var(--azul-medio)'
                      : '#b3261e'
                }}
              >
                {mensaje}
              </div>

            )}

            <button
              type="submit"
              className="btn btn-enviar"
            >
              {modoEdicion
                ? 'Guardar cambios'
                : 'Guardar usuario'}
            </button>

          </form>

        </div>

      </main>

    </div>
  )
}

export default UsuarioFormulario