import { Link } from 'react-router-dom'

function CategoryNav({ mostrarAuth = false }) {

  return (
    <div className="subnav-categorias">

      <div className="container">

        <div className="d-flex">

          <ul className="nav flex-nowrap">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categorias/Filtros"
              >
                Filtros
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categorias/Bombas"
              >
                Bombas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categorias/Accesorios"
              >
                Accesorios
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categorias/Piscinas"
              >
                Piscinas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categorias/Químicos"
              >
                Químicos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/ofertas"
              >
                Ofertas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos"
              >
                Ver todos
              </Link>
            </li>

          </ul>

          {mostrarAuth && (
            <ul className="nav flex-nowrap ms-auto">
            
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Inicia sesión
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/registro">
                  Regístrate
                </Link>
              </li>

            </ul>
            )}          

        </div>

      </div>

    </div>
  )
}

export default CategoryNav