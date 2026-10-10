import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  contarProductosCarrito
} from '../services/carritoService'

function Navbar() {

  const [cantidadCarrito, setCantidadCarrito] =
    useState(contarProductosCarrito())

  useEffect(() => {

    function actualizarContador() {
      setCantidadCarrito(
        contarProductosCarrito()
      )
    }

    window.addEventListener(
      'carritoActualizado',
      actualizarContador
    )

    window.addEventListener(
      'storage',
      actualizarContador
    )

    return () => {

      window.removeEventListener(
        'carritoActualizado',
        actualizarContador
      )

      window.removeEventListener(
        'storage',
        actualizarContador
      )

    }

  }, [])

  return (
    <nav className="navbar navbar-expand navbar-custom sticky-top">

      <div className="container d-flex flex-nowrap align-items-center">

        <Link
          className="navbar-brand flex-shrink-0"
          to="/"
        >

          <img
            src="/assetsimg/logo.png"
            alt="Logo de la empresa"
          />

          AQUA-T

        </Link>

        <ul className="navbar-nav flex-row ms-auto align-items-center">

          <li className="nav-item">
            <Link className="nav-link active" to="/productos">
              Productos
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link active" to="/nosotros">
              Nosotros
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link active" to="/blogs">
              Blog
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link active" to="/contacto">
              Contacto
            </Link>
          </li>

          <li className="nav-item">

            <Link
              className="icono-carrito"
              to="/carrito"
            >

              🛒 Carrito

              {cantidadCarrito > 0 && (
                <span className="badge-carrito">
                  {cantidadCarrito}
                </span>
              )}

            </Link>

          </li>

        </ul>

      </div>

    </nav>
  )
}

export default Navbar