import { useState } from 'react'

function ProductoCard({ producto, onAgregar }) {

  const [agregado, setAgregado] = useState(false)

  const formatoCLP = valor =>
    '$' + Math.round(valor).toLocaleString('es-CL')

  function manejarAgregar() {

    if (onAgregar) {
      onAgregar(producto)
    }

    setAgregado(true)

    setTimeout(() => {
      setAgregado(false)
    }, 900)
  }

  return (
    <div className="card h-100">

      <img
        src={producto.imagen}
        className="card-img-top"
        alt={producto.nombre}
      />

      <div className="card-body text-center">

        <h5 className="card-title">
          {producto.nombre}
        </h5>

        <p className="text-primary">
          {producto.descripcion}
        </p>

        {producto.precioAnterior && (
          <p className="mb-1 text-decoration-line-through text-muted">
            {formatoCLP(producto.precioAnterior)}
          </p>
        )}

        <p
          className={`fw-bold ${
            producto.descuento
              ? 'text-danger'
              : ''
          }`}
        >
          {formatoCLP(producto.precio)}
        </p>

        {producto.descuento && (
          <>
            <span className="badge bg-danger mb-2">
              {producto.descuento}
            </span>

            <br />
          </>
        )}

        <button
          className="btn btn-primary btn-agregar-carrito"
          onClick={manejarAgregar}
          disabled={agregado}
        >
          {agregado
            ? 'Añadido ✓'
            : 'Añadir al carrito'}
        </button>

      </div>

    </div>
  )
}

export default ProductoCard