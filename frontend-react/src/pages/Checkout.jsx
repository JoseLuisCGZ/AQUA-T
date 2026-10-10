import { useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

import Navbar from '../components/Navbar'

import {
  obtenerCarrito,
  calcularSubtotal,
  formatearCLP
} from '../services/carritoService'

import {
  obtenerSesion
} from '../services/sesionService'

import {
  obtenerUsuarioPorId
} from '../services/usuariosService'

import {
  crearPedido
} from '../services/pedidosService'

import {
  regionesComunas
} from '../data/regiones'

function Checkout() {

  const navigate = useNavigate()
  const location = useLocation()

  const carrito = obtenerCarrito()

  const sesion = obtenerSesion()

  const usuario =
    sesion
      ? obtenerUsuarioPorId(sesion.id)
      : null

  const indiceRegion =
    usuario
      ? regionesComunas.findIndex(
          item =>
            item.region === usuario.region
        )
      : -1

  const estadoInicial = {
    nombre:
      usuario
        ? `${usuario.nombre} ${usuario.apellidos}`.trim()
        : '',

    correo:
      usuario?.correo || '',

    telefono:
      usuario?.telefono || '',

    region:
      indiceRegion >= 0
        ? String(indiceRegion)
        : '',

    comuna:
      usuario?.comuna || '',

    direccion:
      usuario?.direccion || ''
  }

  const [formulario, setFormulario] =
    useState(estadoInicial)

  const [mensajeError, setMensajeError] =
    useState('')

  const cupon =
    location.state?.cupon || ''

  const porcentajeDescuento =
    cupon === 'AQUA10'
      ? 0.10
      : cupon === 'VERANO20'
        ? 0.20
        : 0

  const subtotal =
    calcularSubtotal(carrito)

  const descuento =
    subtotal * porcentajeDescuento

  const total =
    subtotal - descuento

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

  function confirmarCompra(evento) {

    evento.preventDefault()

    if (
      formulario.nombre.trim() === '' ||
      formulario.correo.trim() === '' ||
      formulario.region === '' ||
      formulario.comuna === '' ||
      formulario.direccion.trim() === ''
    ) {

      setMensajeError(
        'Complete los datos de envío obligatorios.'
      )

      return
    }

    try {

      const region =
        regionesComunas[
          Number(formulario.region)
        ].region

      const pedido = crearPedido({
        usuarioId:
          usuario?.id || null,

        cliente: {
          nombre:
            formulario.nombre.trim(),

          correo:
            formulario.correo.trim(),

          telefono:
            formulario.telefono.trim()
        },

        envio: {
          region,
          comuna:
            formulario.comuna,

          direccion:
            formulario.direccion.trim()
        },

        productos:
          carrito.map(item => ({
            ...item
          })),

        cupon,

        subtotal,

        descuento,

        total
      })

      vaciarCarrito()

      navigate(
        '/compra-exitosa',
        {
          state: {
            pedidoId: pedido.id
          }
        }
      )

    } catch {

      navigate('/compra-fallida')
    }
  }

  if (carrito.length === 0) {

    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">

          <h2>
            No hay productos para comprar
          </h2>

          <p className="text-muted">
            Agrega productos antes de continuar
            con el pago.
          </p>

          <Link
            to="/productos"
            className="btn btn-primary"
          >
            Ver productos
          </Link>

        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section className="contacto-section">

        <div className="container">

          <h2 className="contacto-titulo">
            Finalizar compra
          </h2>

          <p className="contacto-intro">
            Revisa tus datos y completa la
            información de envío.
          </p>

          <div className="row g-4">

            <div className="col-12 col-lg-7">

              <div className="contacto-card">

                <h4
                  className="mb-4"
                  style={{
                    color:
                      'var(--azul-profundo)'
                  }}
                >
                  Datos del cliente
                </h4>

                <form onSubmit={confirmarCompra}>

                  <div className="mb-3">

                    <label className="form-label">
                      Nombre completo
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formulario.nombre}
                      onChange={actualizarCampo}
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Correo
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="correo"
                      value={formulario.correo}
                      onChange={actualizarCampo}
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Teléfono
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      name="telefono"
                      value={formulario.telefono}
                      onChange={actualizarCampo}
                    />

                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Región
                      </label>

                      <select
                        className="form-select"
                        name="region"
                        value={formulario.region}
                        onChange={actualizarCampo}
                      >

                        <option value="">
                          -- Seleccione --
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

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Comuna
                      </label>

                      <select
                        className="form-select"
                        name="comuna"
                        value={formulario.comuna}
                        onChange={actualizarCampo}
                        disabled={
                          formulario.region === ''
                        }
                      >

                        <option value="">
                          -- Seleccione --
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

                    </div>

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Dirección de envío
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={formulario.direccion}
                      onChange={actualizarCampo}
                    />

                  </div>

                  {mensajeError && (

                    <div className="text-danger mb-3">
                      {mensajeError}
                    </div>

                  )}

                  <button
                    type="submit"
                    className="btn btn-enviar w-100"
                  >
                    Confirmar compra
                  </button>

                </form>

              </div>

            </div>

            <div className="col-12 col-lg-5">

              <div className="resumen-carrito">

                <h4 className="mb-4">
                  Resumen
                </h4>

                {carrito.map(item => (

                  <div
                    className="d-flex justify-content-between mb-2"
                    key={item.id}
                  >

                    <span>
                      {item.nombre}
                      {' '}x{item.cantidad}
                    </span>

                    <span>
                      {formatearCLP(
                        item.precio *
                        item.cantidad
                      )}
                    </span>

                  </div>

                ))}

                <hr />

                <div className="d-flex justify-content-between">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    {formatearCLP(subtotal)}
                  </span>

                </div>

                {descuento > 0 && (

                  <div className="d-flex justify-content-between text-success">

                    <span>
                      Descuento {cupon}
                    </span>

                    <span>
                      -{formatearCLP(descuento)}
                    </span>

                  </div>

                )}

                <hr />

                <div className="d-flex justify-content-between fs-5">

                  <strong>
                    Total
                  </strong>

                  <strong>
                    {formatearCLP(total)}
                  </strong>

                </div>

              </div>

            </div>

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

export default Checkout