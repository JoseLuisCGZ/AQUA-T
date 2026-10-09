import { useState } from 'react'

import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'

import {
  validarNombre,
  validarEmail,
  validarTelefono,
  validarCiudad,
  validarMensaje
} from '../utils/validacionesContacto'

function Contacto() {

  const estadoInicial = {
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    asunto: 'Cotización',
    mensaje: '',
    noRobot: false
  }

  const [formulario, setFormulario] =
    useState(estadoInicial)

  const [errores, setErrores] = useState({})

  const [mensajeForm, setMensajeForm] =
    useState('')

  const [exito, setExito] =
    useState(false)

  function actualizarCampo(evento) {

    const { name, value, type, checked } =
      evento.target

    const nuevoValor =
      type === 'checkbox'
        ? checked
        : value

    setFormulario(prev => ({
      ...prev,
      [name]: nuevoValor
    }))

    validarCampo(name, nuevoValor)
  }

  function validarCampo(campo, valor) {

    let error = ''

    if (campo === 'nombre') {
      error = validarNombre(valor)
    }

    if (campo === 'email') {
      error = validarEmail(valor)
    }

    if (campo === 'telefono') {
      error = validarTelefono(valor)
    }

    if (campo === 'ciudad') {
      error = validarCiudad(valor)
    }

    if (campo === 'mensaje') {
      error = validarMensaje(valor)
    }

    setErrores(prev => ({
      ...prev,
      [campo]: error
    }))
  }

  function enviarFormulario(evento) {

    evento.preventDefault()

    const nuevosErrores = {
      nombre: validarNombre(formulario.nombre),
      email: validarEmail(formulario.email),
      telefono: validarTelefono(formulario.telefono),
      ciudad: validarCiudad(formulario.ciudad),
      mensaje: validarMensaje(formulario.mensaje)
    }

    setErrores(nuevosErrores)

    const hayErrores =
      Object.values(nuevosErrores)
        .some(error => error !== '')

    if (hayErrores) {

      setMensajeForm(
        'Ingrese la Informacion Faltante'
      )

      setExito(false)

      return
    }

    if (!formulario.asunto) {

      setMensajeForm(
        'Seleccione un Asunto'
      )

      setExito(false)

      return
    }

    if (!formulario.noRobot) {

      setMensajeForm(
        'Confirme que no es un robot'
      )

      setExito(false)

      return
    }

    setMensajeForm(
      `Muchas Gracias ${formulario.nombre.trim()} Tu consulta fue enviada con exito.`
    )

    setExito(true)

    setFormulario(estadoInicial)

    setErrores({})
  }

  return (
    <>
      <Navbar />

      <CategoryNav />

      <section className="contacto-section">

        <div className="container">

          <h2 className="contacto-titulo">
            COTIZA O CONSULTA AQUÍ
          </h2>

          <p className="contacto-intro">

            Para poder ayudarte de la mejor manera
            posible, te invitamos a completar nuestro
            formulario. Por favor, proporciona tus
            detalles y tu consulta,{' '}

            <strong>
              y nos pondremos en contacto contigo a
              la brevedad.
            </strong>

          </p>

          <div className="contacto-card">

            <form onSubmit={enviarFormulario}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="nombreUsuario"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombreUsuario"
                    name="nombre"
                    placeholder="Ej: Alex Turner"
                    maxLength="100"
                    value={formulario.nombre}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Máx. 100 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.nombre}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="emailUsuario"
                    className="form-label"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="emailUsuario"
                    name="email"
                    maxLength="100"
                    value={formulario.email}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Máx. 100 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.email}
                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="telefono"
                    className="form-label"
                  >
                    Teléfono
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    maxLength="15"
                    value={formulario.telefono}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Máx. 15 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.telefono}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="ciudad"
                    className="form-label"
                  >
                    Ciudad
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="ciudad"
                    name="ciudad"
                    maxLength="100"
                    value={formulario.ciudad}
                    onChange={actualizarCampo}
                  />

                  <div className="form-text">
                    Máx. 100 caracteres
                  </div>

                  <div className="campo-error">
                    {errores.ciudad}
                  </div>

                </div>

              </div>

              <div className="mb-3">

                <label
                  htmlFor="asunto"
                  className="form-label"
                >
                  Asunto
                </label>

                <select
                  className="form-select"
                  id="asunto"
                  name="asunto"
                  value={formulario.asunto}
                  onChange={actualizarCampo}
                >

                  <option>
                    Cotización
                  </option>

                  <option>
                    Consulta general
                  </option>

                  <option>
                    Soporte técnico
                  </option>

                  <option>
                    Reclamo
                  </option>

                </select>

              </div>

              <div className="mb-3">

                <label
                  htmlFor="mensaje"
                  className="form-label"
                >
                  Mensaje
                </label>

                <textarea
                  className="form-control"
                  id="mensaje"
                  name="mensaje"
                  rows="6"
                  maxLength="500"
                  value={formulario.mensaje}
                  onChange={actualizarCampo}
                />

                <div className="form-text">
                  Máx. 500 caracteres
                </div>

                <div className="campo-error">
                  {errores.mensaje}
                </div>

              </div>

              <div className="mb-4">

                <label className="fake-recaptcha">

                  <input
                    type="checkbox"
                    name="noRobot"
                    checked={formulario.noRobot}
                    onChange={actualizarCampo}
                  />

                  No soy un robot

                </label>

              </div>

              {mensajeForm && (

                <div
                  className={`mb-3 ${
                    exito
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
                Enviar Formulario
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

export default Contacto