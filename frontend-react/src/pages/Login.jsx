import { useState } from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'

import Navbar from '../components/Navbar'

import {
  validarEmailLogin,
  validarContrasenaLogin
} from '../utils/validacionesLogin'

import {
  validarCredenciales
} from '../services/usuariosService'

import {
  guardarSesion
} from '../services/sesionService'

function Login() {

  const navigate = useNavigate()

  const [correo, setCorreo] =
    useState('')

  const [contrasena, setContrasena] =
    useState('')

  const [errores, setErrores] =
    useState({})

  const [mensajeForm, setMensajeForm] =
    useState('')

  const [exito, setExito] =
    useState(false)

  function enviarLogin(evento) {

    evento.preventDefault()

    const nuevosErrores = {
      correo:
        validarEmailLogin(correo),

      contrasena:
        validarContrasenaLogin(
          contrasena
        )
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

    const usuario =
      validarCredenciales(
        correo,
        contrasena
      )

    if (!usuario) {

      setMensajeForm(
        'Correo o contraseña incorrectos'
      )

      setExito(false)

      return
    }

    guardarSesion(usuario)

    setMensajeForm(
      `Bienvenido/a ${usuario.nombre}.`
    )

    setExito(true)

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <>
      <Navbar />

      <section className="contacto-section">

        <div className="container">

          <div className="text-center mb-4">

            <img
              src="/assetsimg/logo.png"
              alt="Logo AQUA-T"
              style={{
                maxWidth: '90px'
              }}
            />

            <h2
              className="fw-bold mt-3"
              style={{
                color:
                  'var(--azul-profundo)'
              }}
            >
              AQUA-T
            </h2>

          </div>

          <div
            className="contacto-card"
            style={{
              maxWidth: '480px'
            }}
          >

            <h3
              className="text-center mb-4"
              style={{
                color:
                  'var(--azul-profundo)'
              }}
            >
              Iniciar sesión
            </h3>

            <form
              onSubmit={enviarLogin}
              noValidate
            >

              <div className="mb-3">

                <label
                  htmlFor="emailUsuario"
                  className="form-label"
                >
                  Correo
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="emailUsuario"
                  maxLength="100"
                  value={correo}
                  onChange={evento =>
                    setCorreo(
                      evento.target.value
                    )
                  }
                />

                <div className="form-text">
                  Solo @duoc.cl,
                  @profesor.duoc.cl o
                  @gmail.com
                </div>

                <div className="campo-error">
                  {errores.correo}
                </div>

              </div>

              <div className="mb-3">

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
                  maxLength="20"
                  value={contrasena}
                  onChange={evento =>
                    setContrasena(
                      evento.target.value
                    )
                  }
                />

                <div className="form-text">
                  Entre 6 y 20 caracteres
                </div>

                <div className="campo-error">
                  {errores.contrasena}
                </div>

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
                className="btn btn-enviar w-100"
              >
                Iniciar sesión
              </button>

              <p className="text-center mt-3 mb-0">

                ¿No tienes cuenta?{' '}

                <Link to="/registro">
                  Regístrate
                </Link>

              </p>

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

export default Login