import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-custom sticky-top">
      <div className="container d-flex flex-nowrap align-items-center">

        <Link className="navbar-brand flex-shrink-0" to="/">
          <img
            src="/assetsimg/logo.png"
            alt="Logo de la empresa"
          />
          AQUA-T
        </Link>

        <ul className="navbar-nav flex-row ms-auto align-items-center">

          <li className="nav-item">
            <Link className="nav-link" to="/productos">
              Productos
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/nosotros">
              Nosotros
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/blogs">
              Blog
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/contacto">
              Contacto
            </Link>
          </li>

          <li className="nav-item">
            <Link className="icono-carrito" to="/carrito">
              🛒 Carrito
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  )
}

export default Navbar