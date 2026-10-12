import {
  useEffect,
  useState
} from 'react'

import { Link } from 'react-router-dom'

import { agregarAlCarrito } from '../services/carritoService'
import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import ProductoCard from '../components/ProductoCard'

import {
  obtenerProductos
} from '../services/productosService'

function Ofertas() {

  const [productos, setProductos] =
    useState(obtenerProductos)

  useEffect(() => {

    function actualizarProductos() {
      setProductos(
        obtenerProductos()
      )
    }

    window.addEventListener(
      'productosActualizados',
      actualizarProductos
    )

    return () => {
      window.removeEventListener(
        'productosActualizados',
        actualizarProductos
      )
    }

  }, [])

  const ofertas = productos.filter(
    producto => producto.precioAnterior
  )

  return (
    <>
      <Navbar />

      <CategoryNav />

      <div className="text-center mb-4 mt-4">

        <h2
          className="fw-bold"
          style={{ color: 'var(--azul-profundo)' }}
        >
          Ofertas
        </h2>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: '550px' }}
        >
          Aprovecha los descuentos en productos
          seleccionados para tu piscina.
        </p>

      </div>

      <div className="container my-4">

        {ofertas.length === 0 ? (

          <div className="text-center py-5">

            <p className="text-muted">
              Por ahora no hay productos en oferta.
            </p>

            <Link
              to="/productos"
              className="btn btn-primary"
            >
              Ver todos los productos
            </Link>

          </div>

        ) : (

          <div className="row g-4">

            {ofertas.map(producto => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={producto.id}
              >
                <ProductoCard
                  producto={producto}
                  onAgregar={agregarAlCarrito}
                />
              </div>
            ))}

          </div>

        )}

      </div>

      <footer>
        <p className="mb-0">
          © 2026 AQUA-T Derechos Reservados
        </p>
      </footer>
    </>
  )
}

export default Ofertas