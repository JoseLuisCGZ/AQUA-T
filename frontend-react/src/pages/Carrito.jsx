import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  calcularSubtotal,
  formatearCLP
} from '../services/carritoService'

function Carrito() {

  const [carrito, setCarrito] =
    useState(obtenerCarrito())

  const [cupon, setCupon] =
    useState('')

  const [porcentajeCupon, setPorcentajeCupon] =
    useState(0)

  const [mensajeCupon, setMensajeCupon] =
    useState('')

  const [cuponValido, setCuponValido] =
    useState(false)

  function sumar(item) {

    const actualizado =
      actualizarCantidad(
        item.id,
        item.cantidad + 1
      )

    setCarrito(actualizado)
  }

  function restar(item) {

    const actualizado =
      actualizarCantidad(
        item.id,
        item.cantidad - 1
      )

    setCarrito(actualizado)
  }

  function cambiarCantidad(
    id,
    cantidad
  ) {

    const actualizado =
      actualizarCantidad(
        id,
        cantidad
      )

    setCarrito(actualizado)
  }

  function eliminar(id) {

    const actualizado =
      eliminarDelCarrito(id)

    setCarrito(actualizado)
  }

  function aplicarCupon() {

    const codigo =
      cupon.trim().toUpperCase()

    if (codigo === 'AQUA10') {

      setPorcentajeCupon(0.10)

      setMensajeCupon(
        'Cupón aplicado: 10% de descuento.'
      )

      setCuponValido(true)

      return
    }

    if (codigo === 'VERANO20') {

      setPorcentajeCupon(0.20)

      setMensajeCupon(
        'Cupón aplicado: 20% de descuento.'
      )

      setCuponValido(true)

      return
    }

    setPorcentajeCupon(0)

    setMensajeCupon(
      'Cupón inválido.'
    )

    setCuponValido(false)
  }

  function pagar() {

    if (carrito.length === 0) {
      return
    }

    alert(
      '¡Compra simulada con éxito! Gracias por tu compra en AQUA-T.'
    )

    vaciarCarrito()

    setCarrito([])

    setPorcentajeCupon(0)

    setCupon('')

    setMensajeCupon('')
  }

  const subtotal =
    calcularSubtotal(carrito)

  const descuento =
    subtotal * porcentajeCupon

  const total =
    Math.max(
      subtotal - descuento,
      0
    )

  return (
    <>
      <Navbar />

      <section className="py-5">

        <div
          className="container"
          style={{
            maxWidth: '900px'
          }}
        >

          <h1
            className="fw-bold mb-4"
            style={{
              color:
                'var(--azul-profundo)'
            }}
          >
            Mi carrito de compras
          </h1>

          <div className="panel-carrito">

            {carrito.length === 0 ? (

              <div className="carrito-vacio">

                <p className="fs-5 text-muted">
                  Tu carrito está vacío.
                </p>

                <Link
                  to="/productos"
                  className="btn btn-primary"
                >
                  Ver productos
                </Link>

              </div>

            ) : (

              carrito.map(item => (

                <div
                  className="fila-carrito"
                  key={item.id}
                >

                  <img
                    src={item.imagen}
                    alt={item.nombre}
                  />

                  <div className="info-producto">

                    <h6 className="mb-1">
                      {item.nombre}
                    </h6>

                    <div>
                      {formatearCLP(
                        item.precio
                      )}{' '}
                      c/u
                    </div>

                    <button
                      className="btn-eliminar-item"
                      onClick={() =>
                        eliminar(item.id)
                      }
                    >
                      Eliminar
                    </button>

                  </div>

                  <div className="control-cantidad">

                    <button
                      type="button"
                      onClick={() =>
                        restar(item)
                      }
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={item.cantidad}
                      onChange={evento =>
                        cambiarCantidad(
                          item.id,
                          evento.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        sumar(item)
                      }
                    >
                      +
                    </button>

                  </div>

                  <div
                    className="fw-bold"
                    style={{
                      minWidth: '90px',
                      textAlign: 'right'
                    }}
                  >
                    {formatearCLP(
                      item.precio *
                      item.cantidad
                    )}
                  </div>

                </div>

              ))

            )}

          </div>

          {carrito.length > 0 && (

            <div className="row mt-4">

              <div className="col-12 col-md-6 ms-auto">

                <div className="resumen-carrito">

                  <div className="input-group mb-3">

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingresa el cupón de descuento"
                      value={cupon}
                      onChange={evento =>
                        setCupon(
                          evento.target.value
                        )
                      }
                    />

                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={aplicarCupon}
                    >
                      Aplicar
                    </button>

                  </div>

                  {mensajeCupon && (

                    <div
                      className={`small mb-3 ${
                        cuponValido
                          ? 'text-success'
                          : 'text-danger'
                      }`}
                    >
                      {mensajeCupon}
                    </div>

                  )}

                  <div className="d-flex justify-content-between mb-2">

                    <span>
                      Subtotal
                    </span>

                    <span>
                      {formatearCLP(
                        subtotal
                      )}
                    </span>

                  </div>

                  {descuento > 0 && (

                    <div className="d-flex justify-content-between mb-3">

                      <span>
                        Descuento
                      </span>

                      <span className="text-success">
                        -
                        {formatearCLP(
                          descuento
                        )}
                      </span>

                    </div>

                  )}

                  <hr />

                  <div className="d-flex justify-content-between mb-3">

                    <strong>
                      Total
                    </strong>

                    <strong
                      style={{
                        color:
                          'var(--azul-profundo)'
                      }}
                    >
                      {formatearCLP(
                        total
                      )}
                    </strong>

                  </div>

                  <button
                    className="btn btn-enviar w-100"
                    onClick={pagar}
                  >
                    Pagar
                  </button>

                </div>

              </div>

            </div>

          )}

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

export default Carrito