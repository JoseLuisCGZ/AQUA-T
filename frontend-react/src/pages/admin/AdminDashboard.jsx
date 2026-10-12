import {
  useEffect,
  useState
} from 'react'

import AdminSidebar from '../../components/AdminSidebar'

import {
  obtenerSesion
} from '../../services/sesionService'

import {
  obtenerUsuarios
} from '../../services/usuariosService'

import {
  obtenerProductos
} from '../../services/productosService'

function AdminDashboard() {

  const sesion = obtenerSesion()

  const esAdministrador =
    sesion?.tipoUsuario ===
    'Administrador'

  const [totalProductos,
  setTotalProductos] =
  useState(0)

  const totalUsuarios =
    obtenerUsuarios().length

  useEffect(() => {

  let activo = true

  async function cargarTotalProductos() {

    try {

      const productos =
        await obtenerProductos()

      if (activo) {
        setTotalProductos(
          productos.length
        )
      }

    } catch (error) {

      console.error(error)

    }
  }

  cargarTotalProductos()

  return () => {
    activo = false
  }

}, [])

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