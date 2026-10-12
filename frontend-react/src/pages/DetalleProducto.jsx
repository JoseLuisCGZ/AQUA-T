import { useState } from 'react'

import {
  Link,
  useParams
} from 'react-router-dom'

import {
  agregarAlCarrito,
  formatearCLP
} from '../services/carritoService'

import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import ProductoCard from '../components/ProductoCard'

import {
  obtenerProductos,
  obtenerProductoPorId
} from '../services/productosService'

function DetalleProducto() {

  const { id }= useParams()

  const [agregado, setAgregado] = useState(false)

  const producto= obtenerProductoPorId(id)

  function manejarAgregar() {

    agregarAlCarrito(producto)

    setAgregado(true)

    setTimeout(() => {
      setAgregado(false)
    }, 900)
  }

  if (!producto) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">

          <h1>Producto no encontrado</h1>

          <Link
            to="/productos"
            className="btn btn-primary mt-3"
          >
            Volver a productos
          </Link>

        </div>
      </>
    )
  }

  const relacionados= obtenerProductos()
    .filter(
      item =>
        item.categoria=== producto.categoria &&
        item.id!== producto.id
    )
    .slice(0, 4)

  return (
    <>
      <Navbar />

      <CategoryNav />

      <div className="container my-4">

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">

            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>

            <li className="breadcrumb-item">
              <Link to="/productos">Productos</Link>
            </li>

            <li className="breadcrumb-item">
              <Link to={`/categorias/${producto.categoria}`}>
                {producto.categoria}
              </Link>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              {producto.nombre}
            </li>

          </ol>
        </nav>

        <div className="row g-4 align-items-center">

          <div className="col-12 col-md-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
            />
          </div>

          <div className="col-12 col-md-6">

            <span className="badge bg-primary mb-2">
              {producto.categoria}
            </span>

            <h1
              className="fw-bold"
              style={{ color: 'var(--azul-profundo)' }}
            >
              {producto.nombre}
            </h1>

            <p className="text-muted">
              {producto.descripcion}
            </p>

            {producto.precioAnterior && (
              <p className="mb-1 text-decoration-line-through text-muted">
                {formatearCLP(producto.precioAnterior)}
              </p>
            )}

            <p
              className={`fs-3 fw-bold ${
                producto.descuento
                  ? 'text-danger'
                  : ''
              }`}
            >
              {formatearCLP(producto.precio)}
            </p>

            {producto.descuento && (
              <span className="badge bg-danger mb-3">
                {producto.descuento}
              </span>
            )}

            <div className="d-flex flex-wrap gap-2 mt-3">

              <button
                className="btn btn-primary btn-agregar-carrito"
                onClick={manejarAgregar}
                disabled={agregado}
              >
                {agregado
                  ? 'Añadido ✓'
                  : 'Añadir al carrito'}
              </button>

              <Link
                to="/carrito"
                className="btn btn-outline-primary"
              >
                Ver carrito
              </Link>

              <Link
                to="/productos"
                className="btn btn-outline-secondary"
              >
                Seguir comprando
              </Link>

            </div>

          </div>

        </div>

        {relacionados.length > 0 && (
          <section className="mt-5">

            <h3
              className="fw-bold mb-3"
              style={{ color: 'var(--azul-profundo)' }}
            >
              Productos relacionados
            </h3>

            <div className="row g-4">

              {relacionados.map(item => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={item.id}
                >
                  <ProductoCard
                    producto={item}
                    onAgregar={agregarAlCarrito}
                  />
                </div>
              ))}

            </div>

          </section>
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

export default DetalleProducto