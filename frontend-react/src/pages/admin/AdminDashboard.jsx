import AdminSidebar from '../../components/AdminSidebar'

import {
  obtenerSesion
} from '../../services/sesionService'

import {
  obtenerUsuarios
} from '../../services/usuariosService'

import {
  productos
} from '../../data/productos'

function AdminDashboard() {

  const sesion = obtenerSesion()

  const esAdministrador =
    sesion?.tipoUsuario ===
    'Administrador'

  const totalProductos =
    productos.length

  const totalUsuarios =
    obtenerUsuarios().length

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-contenido">

        <div className="admin-header">

          <h1>
            ¡Hola {sesion?.nombre}!
          </h1>

        </div>

        <div className="row g-4 mb-4">

          <div className="col-12 col-sm-6 col-md-4">

            <div className="admin-card-stat">

              <div className="admin-stat-numero">
                {totalProductos}
              </div>

              <div className="admin-stat-label">
                Productos registrados
              </div>

            </div>

          </div>

          {esAdministrador && (

            <div className="col-12 col-sm-6 col-md-4">

              <div className="admin-card-stat">

                <div className="admin-stat-numero">
                  {totalUsuarios}
                </div>

                <div className="admin-stat-label">
                  Usuarios registrados
                </div>

              </div>

            </div>

          )}

        </div>

        <div className="admin-panel">

          <p className="mb-0">

            Desde este panel puedes gestionar
            el catálogo de productos

            {esAdministrador &&
              ' y los usuarios'}

            {' '}del sistema AQUA-T.
            Usa el menú lateral para navegar
            entre las secciones.

          </p>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard