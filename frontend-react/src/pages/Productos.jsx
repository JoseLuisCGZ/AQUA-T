import {
  useEffect,
  useState
} from 'react'

import {
  useSearchParams
} from 'react-router-dom'
import { agregarAlCarrito } from '../services/carritoService'
import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import ProductoCard from '../components/ProductoCard'
import {
  obtenerProductos
} from '../services/productosService'

function Productos() {
  const [searchParams] = useSearchParams()

  const [productos, setProductos] =
  useState(obtenerProductos())

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

  const categoria = searchParams.get('categoria')

  const productosFiltrados = categoria
    ? productos.filter(
        producto => producto.categoria === categoria
      )
    : productos


  return (
    <>
      <Navbar />

      <CategoryNav />

      <div className="text-center mb-4 mt-4">
        <h2
          className="fw-bold"
          style={{ color: 'var(--azul-profundo)' }}
        >
          {categoria
            ? `Nuestros productos: ${categoria}`
            : 'Nuestros Productos'}
        </h2>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: '550px' }}
        >
          Conoce nuestra línea de productos disponibles para
          mantener tu piscina en las mejores condiciones.
        </p>
      </div>

      <div className="container my-4">
        <div className="row g-4">

          {productosFiltrados.map(producto => (
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
      </div>

      <footer>
        <p className="mb-0">
          © 2026 AQUA-T Derechos Reservados
        </p>
      </footer>
    </>
  )
}

export default Productos