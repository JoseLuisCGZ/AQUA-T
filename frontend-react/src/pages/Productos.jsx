import {
  useEffect,
  useState
} from 'react'

import {
  Link,
  useSearchParams
} from 'react-router-dom'
import { agregarAlCarrito } from '../services/carritoService'
import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import ProductoCard from '../components/ProductoCard'
import {
  categoriasProducto,
  obtenerProductos
} from '../services/productosService'

function Productos() {
  const [searchParams] = useSearchParams()

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
          'No fue posible cargar los productos.'
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

        <div className="row g-3 justify-content-center mb-5">

          {categoriasProducto.map(nombre => {

            const items= productos.filter(
              producto => producto.categoria=== nombre
            )

            return (
              <div
                className="col-6 col-md-4 col-lg-2"
                key={nombre}
              >
                <Link
                  to={`/categorias/${nombre}`}
                  className={`categoria-tile card h-100 text-center text-decoration-none ${
                    nombre=== categoria
                      ? 'border-primary border-2'
                      : ''
                  }`}
                >

                  {items.length > 0 && (
                    <img
                      src={items[0].imagen}
                      alt={nombre}
                      className="card-img-top"
                      style={{
                        height: '110px',
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  <div className="card-body p-2">
                    <h6 className="card-title mb-0">
                      {nombre}
                    </h6>

                    <small className="text-muted">
                      {items.length} {items.length=== 1
                        ? 'producto'
                        : 'productos'}
                    </small>
                  </div>

                </Link>
              </div>
            )
          })}

        </div>

        <div className="row g-4">

              {cargando && (
                      
              <div className="col-12 text-center">
              
                <p className="text-muted">
                  Cargando productos...
                </p>
                      
              </div>

            )}

            {error && (
            
              <div className="col-12 text-center">
              
                <p className="text-danger">
                  {error}
                </p>
            
              </div>

            )}

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