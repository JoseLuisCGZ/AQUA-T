import {
  NavLink,
  Link
} from 'react-router-dom'

import {
  obtenerSesion
} from '../services/sesionService'

function AdminSidebar() {

  const sesion = obtenerSesion()

  const esAdministrador =
    sesion?.tipoUsuario ===
    'Administrador'

  return (
    <aside className="admin-sidebar">

      <Link
        className="admin-brand"
        to="/admin"
      >

        <img
          src="/assetsimg/logo.png"
          alt="Logo de la empresa"
        />

        AQUA-T Admin

      </Link>

      <ul className="admin-nav">

        <li>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'activo'
                  : ''
              }`
            }
          >
            Dashboard
          </NavLink>

        </li>

        <li>

          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive
                  ? 'activo'
                  : ''
              }`
            }
          >
            Productos
          </NavLink>

        </li>

        {esAdministrador && (

          <li>

            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                `admin-nav-link ${
                  isActive
                    ? 'activo'
                    : ''
                }`
              }
            >
              Usuarios
            </NavLink>

          </li>

        )}

      </ul>

      <div className="admin-volver">

        <Link to="/">
          ← Volver a la tienda
        </Link>

      </div>

    </aside>
  )
}

export default AdminSidebar