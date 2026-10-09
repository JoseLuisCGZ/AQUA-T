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
                to="/productos?categoria=Filtros"
              >
                Filtros
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos?categoria=Bombas"
              >
                Bombas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos?categoria=Accesorios"
              >
                Accesorios
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos?categoria=Piscinas"
              >
                Piscinas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos?categoria=Químicos"
              >
                Químicos
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