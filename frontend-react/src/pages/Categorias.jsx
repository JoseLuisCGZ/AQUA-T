import {
  useEffect,
  useState
} from 'react'

import {
  Link,
  useParams
} from 'react-router-dom'

import { agregarAlCarrito } from '../services/carritoService'
import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import ProductoCard from '../components/ProductoCard'

import {
  categoriasProducto,
  obtenerProductos
} from '../services/productosService'

function Categorias() {

  const { nombre } = useParams()

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
          'No fue posible cargar las categorías.'
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

  const productosDe = categoria =>
    productos.filter(
      producto => producto.categoria=== categoria
    )

  if (nombre && !categoriasProducto.includes(nombre)) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">

          <h1>Categoría no encontrada</h1>

          <Link
            to="/categorias"
            className="btn btn-primary mt-3"
          >
            Ver todas las categorías
          </Link>

        </div>
      </>
    )
  }

  const categoriasMostradas= nombre
    ? [nombre]
    : categoriasProducto

  return (
    <>
      <Navbar />

      <CategoryNav />

      <div className="text-center mb-4 mt-4">

        <h2
          className="fw-bold"
          style={{ color: 'var(--azul-profundo)' }}
        >
          Categorías
        </h2>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: '550px' }}
        >
          Elige una categoría para ver sus productos.
        </p>

      </div>

      <div className="container my-4">

            {cargando && (
                  
            <p className="text-center text-muted">
              Cargando productos...
            </p>

          )}

          {error && (
          
            <p className="text-center text-danger">
              {error}
            </p>

          )}


        <div className="row g-3 justify-content-center mb-5">

          {categoriasProducto.map(categoria => {

            const items = productosDe(categoria)

            return (
              <div
                className="col-6 col-md-4 col-lg-2"
                key={categoria}
              >
                <Link
                  to={`/categorias/${categoria}`}
                  className={`categoria-tile card h-100 text-center text-decoration-none ${
                    categoria=== nombre
                      ? 'border-primary border-2'
                      : ''
                  }`}
                >

                  {items.length > 0 && (
                    <img
                      src={items[0].imagen}
                      alt={categoria}
                      className="card-img-top"
                      style={{
                        height: '110px',
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  <div className="card-body p-2">
                    <h6 className="card-title mb-0">
                      {categoria}
                    </h6>

                    <small className="text-muted">
                      {items.length} {items.length === 1
                        ? 'producto'
                        : 'productos'}
                    </small>
                  </div>

                </Link>
              </div>
            )
          })}

        </div>

        {categoriasMostradas.map(categoria => {

          const items = productosDe(categoria)

          return (
            <section
              className="mb-5"
              key={categoria}
            >

              <h3
                className="fw-bold mb-3"
                style={{ color: 'var(--azul-profundo)' }}
              >
                {categoria}
              </h3>

              {items.length=== 0 ? (

                <p className="text-muted">
                  Aún no hay productos en esta categoría.
                </p>

              ) : (

                <div className="row g-4">

                  {items.map(producto => (
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

            </section>
          )
        })}

      </div>

      <footer>
        <p className="mb-0">
          © 2026 AQUA-T Derechos Reservados
        </p>
      </footer>
    </>
  )
}

export default Categorias