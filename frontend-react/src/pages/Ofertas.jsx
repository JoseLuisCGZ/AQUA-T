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
  useState([])

const [cargando, setCargando] =
  useState(true)

const [error, setError] =
  useState('')

  useEffect(() => {

  let activo = true

  async function cargarProductos() {

    try {

      const datos =
        await obtenerProductos()

      if (activo) {
        setProductos(datos)
        setError('')
      }

    } catch (error) {

      console.error(error)

      if (activo) {
        setError(
          'No fue posible cargar las ofertas.'
        )
      }

    } finally {

      if (activo) {
        setCargando(false)
      }
    }
  }

  cargarProductos()

  return () => {
    activo = false
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

            {cargando && (
                  
            <p className="text-center text-muted">
              Cargando ofertas...
            </p>

          )}

          {error && (
          
            <p className="text-center text-danger">
              {error}
            </p>

          )}

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