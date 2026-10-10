import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

function CompraFallida() {

  return (
    <>
      <Navbar />

      <div className="container py-5 text-center">

        <div className="contacto-card">

          <h1 className="text-danger fw-bold">
            No se pudo completar la compra
          </h1>

          <p className="mt-3">
            Ocurrió un problema al procesar
            el pedido. Tu carrito no se ha perdido.
          </p>

          <Link
            to="/checkout"
            className="btn btn-primary mt-3 me-2"
          >
            Intentar nuevamente
          </Link>

          <Link
            to="/carrito"
            className="btn btn-outline-primary mt-3"
          >
            Volver al carrito
          </Link>

        </div>

      </div>
    </>
  )
}

export default CompraFallida