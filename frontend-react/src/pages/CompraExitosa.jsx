import {
  Link,
  useLocation
} from 'react-router-dom'

import Navbar from '../components/Navbar'

function CompraExitosa() {

  const location = useLocation()

  const pedidoId =
    location.state?.pedidoId

  return (
    <>
      <Navbar />

      <div className="container py-5 text-center">

        <div className="contacto-card">

          <h1
            className="fw-bold"
            style={{
              color:
                'var(--azul-profundo)'
            }}
          >
            ¡Compra realizada con éxito!
          </h1>

          <p className="mt-3">
            Gracias por comprar en AQUA-T.
          </p>

          {pedidoId && (
            <p>
              Número de pedido:
              {' '}
              <strong>
                #{pedidoId}
              </strong>
            </p>
          )}

          <Link
            to="/productos"
            className="btn btn-primary mt-3"
          >
            Seguir comprando
          </Link>

        </div>

      </div>
    </>
  )
}

export default CompraExitosa