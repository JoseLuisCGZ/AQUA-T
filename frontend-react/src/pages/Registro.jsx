import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  agregarUsuario,
  correoExiste,
  runExiste
} from '../services/usuariosService'

import Navbar from '../components/Navbar'

import { regionesComunas } from '../data/regiones'

import {
  validarRun,
  validarNombreRegistro,
  validarApellidos,
  validarCorreoRegistro,
  validarContrasena,
  validarConfirmarContrasena,
  validarTelefonoRegistro,
  validarFechaNacimiento,
  validarRegion,
  validarComuna,
  validarDireccion
} from '../utils/validacionesRegistro'

function Registro() {

  const estadoInicial = {
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    telefono: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: ''
  }

  const [formulario, setFormulario] =
    useState(estadoInicial)

  const [errores, setErrores] =
    useState({})

  const [mensajeForm, setMensajeForm] =
    useState('')

  const [registroExitoso, setRegistroExitoso] =
    useState(false)

  const comunasDisponibles =
    formulario.region !== ''
      ? regionesComunas[
          Number(formulario.region)
        ].comunas
      : []

  function validarCampo(campo, valor) {

    let error = ''

    switch (campo) {

      case 'run':
        error = validarRun(valor)
        break

      case 'nombre':
        error =
          validarNombreRegistro(valor)
        break

      case 'apellidos':
        error =
          validarApellidos(valor)
        break

      case 'correo':
        error =
          validarCorreoRegistro(valor)
        break

      case 'contrasena':
        error =
          validarContrasena(valor)
        break

      case 'confirmarContrasena':
        error =
          validarConfirmarContrasena(
            formulario.contrasena,
            valor
          )
        break

      case 'telefono':
        error =
          validarTelefonoRegistro(valor)
        break

      case 'fechaNacimiento':
        error =
          validarFechaNacimiento(valor)
        break

      case 'region':
        error =
          validarRegion(valor)
        break

      case 'comuna':
        error =
          validarComuna(valor)
        break

      case 'direccion':
        error =
          validarDireccion(valor)
        break

      default:
        break
    }

    setErrores(prev => ({
      ...prev,
      [campo]: error
    }))
  }

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

      setErrores(prev => ({
        ...prev,
        comuna: ''
      }))

    } else {

      setFormulario(prev => ({
        ...prev,
        [name]: value
      }))

    }

    validarCampo(name, value)
  }

  function registrar(evento) {

    evento.preventDefault()

    const nuevosErrores = {

      run:
        validarRun(formulario.run),

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
        validarContrasena(
          formulario.contrasena
        ),

      confirmarContrasena:
        validarConfirmarContrasena(
          formulario.contrasena,
          formulario.confirmarContrasena
        ),

      telefono:
        validarTelefonoRegistro(
          formulario.telefono
        ),

      fechaNacimiento:
        validarFechaNacimiento(
          formulario.fechaNacimiento
        ),

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

    setErrores(nuevosErrores)

    const hayErrores =
      Object.values(nuevosErrores)
        .some(error => error !== '')

    if (runExiste(formulario.run)) {

    setErrores(prev => ({
        ...prev,
        run: 'Este RUN ya está registrado'
    }))

    setMensajeForm(
        'El RUN ingresado ya tiene una cuenta'
    )

    setRegistroExitoso(false)

    return
    }

    if (correoExiste(formulario.correo)) {

      setErrores(prev => ({
        ...prev,
        correo: 'Este correo ya está registrado'
      }))

      setMensajeForm(
        'El correo ingresado ya tiene una cuenta'
      )

      setRegistroExitoso(false)

      return
    }
    
        const regionSeleccionada =
      regionesComunas[
        Number(formulario.region)
      ].region
  
    agregarUsuario({
      run: formulario.run.trim().toUpperCase(),
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      correo: formulario.correo.trim().toLowerCase(),
      contrasena: formulario.contrasena,
      telefono: formulario.telefono.trim(),
      fechaNacimiento: formulario.fechaNacimiento,
      tipoUsuario: 'Cliente',
      region: regionSeleccionada,
      comuna: formulario.comuna,
      direccion: formulario.direccion.trim()
    })

    setMensajeForm(
      `¡Registro exitoso! Bienvenido/a ${formulario.nombre.trim()}.`
    )

    setRegistroExitoso(true)

    setFormulario(estadoInicial)

    setErrores({})
  }

  return (
    <>
      <Navbar />

      <section className="contacto-section">

        <div className="container">

          <div className="text-end mb-3">

            <Link to="/login">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>

          </div>

          <h2 className="contacto-titulo">
            Registro de usuario
          </h2>

          <p className="contacto-intro">
            Crea tu cuenta para comprar más rápido
            y hacer seguimiento a tus pedidos.
          </p>

          <div className="contacto-card">

            <form
              onSubmit={registrar}
              noValidate
            >

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="run"
                    className="form-label"
                  >
                    RUN
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="run"
                    name="run"
                    placeholder="Ej: 19011022K"
                    maxLength="9"
                    value={formulario.run}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Sin puntos ni guion. Entre 7 y 9 caracteres.
                  </div>

                  <div className="campo-error">
                    {errores.run}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    maxLength="50"
                    value={formulario.nombre}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Máx. 50 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.nombre}
                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="apellidos"
                    className="form-label"
                  >
                    Apellidos
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    name="apellidos"
                    maxLength="100"
                    value={formulario.apellidos}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Máx. 100 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.apellidos}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="correo"
                    className="form-label"
                  >
                    Correo
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    maxLength="100"
                    value={formulario.correo}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Solo @duoc.cl, @profesor.duoc.cl o @gmail.com
                  </div>

                  <div className="campo-error">
                    {errores.correo}
                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="contrasena"
                    className="form-label"
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="contrasena"
                    name="contrasena"
                    maxLength="20"
                    value={formulario.contrasena}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Entre 6 y 20 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.contrasena}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="confirmarContrasena"
                    className="form-label"
                  >
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    maxLength="20"
                    value={formulario.confirmarContrasena}
                    onChange={actualizarCampo}
                  />

                  <div className="campo-error">
                    {errores.confirmarContrasena}
                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="telefono"
                    className="form-label"
                  >
                    Teléfono (opcional)
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    placeholder="Ej: 912345678"
                    maxLength="15"
                    value={formulario.telefono}
                    onChange={actualizarCampo}
                  />

                  <div className="campo-error">
                    {errores.telefono}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="fechaNacimiento"
                    className="form-label"
                  >
                    Fecha de nacimiento (opcional)
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formulario.fechaNacimiento}
                    onChange={actualizarCampo}
                  />

                  <div className="campo-error">
                    {errores.fechaNacimiento}
                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="region"
                    className="form-label"
                  >
                    Región
                  </label>

                  <select
                    className="form-select"
                    id="region"
                    name="region"
                    value={formulario.region}
                    onChange={actualizarCampo}
                  >

                    <option value="">
                      -- Seleccione la región --
                    </option>

                    {regionesComunas.map(
                      (item, index) => (

                        <option
                          value={index}
                          key={item.region}
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

                  <label
                    htmlFor="comuna"
                    className="form-label"
                  >
                    Comuna
                  </label>

                  <select
                    className="form-select"
                    id="comuna"
                    name="comuna"
                    value={formulario.comuna}
                    onChange={actualizarCampo}
                    disabled={
                      formulario.region === ''
                    }
                  >

                    <option value="">
                      -- Seleccione la comuna --
                    </option>

                    {comunasDisponibles.map(
                      comuna => (

                        <option
                          value={comuna}
                          key={comuna}
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

                <label
                  htmlFor="direccion"
                  className="form-label"
                >
                  Dirección
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  maxLength="300"
                  value={formulario.direccion}
                  onChange={actualizarCampo}
                />

                <div className="form-text">
                  Máx. 300 caracteres
                </div>

                <div className="campo-error">
                  {errores.direccion}
                </div>

              </div>

              {mensajeForm && (

                <div
                  className={`mb-3 ${
                    registroExitoso
                      ? 'text-primary fw-semibold'
                      : 'text-danger'
                  }`}
                >
                  {mensajeForm}
                </div>

              )}

              <button
                type="submit"
                className="btn btn-enviar"
              >
                Registrar
              </button>

            </form>

          </div>

        </div>

      </section>

      <footer>
        <p className="mb-0">
          © 2026 AQUA-T Derechos Reservados
        </p>
      </footer>
    </>
  )
}

export default Registro