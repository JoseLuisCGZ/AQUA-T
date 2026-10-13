import {
  useEffect,
  useState
} from 'react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/AdminSidebar'

import {
  obtenerSesion
} from '../../services/sesionService'

import {
  obtenerProductos,
  eliminarProducto
} from '../../services/productosService'

import {
  formatearCLP
} from '../../services/carritoService'

function AdminProductos() {

  const sesion =
    obtenerSesion()

  const esAdministrador =
    sesion?.tipoUsuario ===
    'Administrador'

const [productos, setProductos] =
  useState([])

const [cargando, setCargando] =
  useState(true)

const [error, setError] =
  useState('')

  useEffect(() => {

  let activo = true

  async function cargarProductos() {

    try {

      const datos =
        await obtenerProductos()

      if (activo) {
        setProductos(datos)
        setError('')
      }

    } catch (error) {

      console.error(error)

      if (activo) {
        setError(
          'No fue posible cargar los productos.'
        )
      }

    } finally {

      if (activo) {
        setCargando(false)
      }
    }
  }

  cargarProductos()

  return () => {
    activo = false
  }

}, [])

  async function eliminar(id) {

  const producto =
    productos.find(
      producto =>
        String(producto.id) ===
        String(id)
    )

  if (!producto) {
    return
  }

  const confirmar =
    window.confirm(
      `¿Eliminar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`
    )

  if (!confirmar) {
    return
  }

  try {

    await eliminarProducto(id)

    setProductos(prev =>
      prev.filter(
        producto =>
          String(producto.id) !==
          String(id)
      )
    )

    setError('')

  } catch (error) {

    console.error(error)

    setError(
      'No fue posible eliminar el producto.'
    )
  }
}

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-contenido">

        <div className="admin-header">

          <h1>
            Productos
          </h1>

          {esAdministrador && (

            <Link
              to="/admin/productos/nuevo"
              className="btn btn-enviar"
            >
              + Nuevo producto
            </Link>

          )}

        </div>

        <div className="admin-panel">

          {cargando && (

          <p className="text-muted text-center">
            Cargando productos...
          </p>
        
        )}
        
        {error && (
        
          <p className="text-danger text-center">
            {error}
          </p>
        
        )}

          {productos.length === 0 ? (

            <p className="text-muted text-center mb-0">
              Todavía no hay productos registrados.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table admin-tabla">

                <thead>

                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>
                      Stock crítico
                    </th>

                    <th className="text-end">
                      Acciones
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {productos.map(
                    producto => {

                      const stockBajo =
                        producto.stockCritico !==
                          null &&
                        producto.stockCritico !==
                          undefined &&
                        producto.stock <=
                          producto.stockCritico

                      return (

                        <tr key={producto.id}>

                          <td>
                            {producto.codigo}
                          </td>

                          <td>
                            {producto.nombre}
                          </td>

                          <td>
                            {producto.categoria}
                          </td>

                          <td>
                            {formatearCLP(
                              producto.precio
                            )}
                          </td>

                          <td>

                            {producto.stock}

                            {stockBajo && (

                              <span className="badge bg-danger ms-2">
                                Stock bajo
                              </span>

                            )}

                          </td>

                          <td>
                            {producto.stockCritico ??
                              '-'}
                          </td>

                          <td className="text-end">

                            {esAdministrador ? (
                              <>

                                <Link
                                  to={`/admin/productos/${producto.id}/editar`}
                                  className="btn btn-sm btn-outline-primary me-2"
                                >
                                  Editar
                                </Link>

                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    eliminar(
                                      producto.id
                                    )
                                  }
                                >
                                  Eliminar
                                </button>

                              </>
                            ) : (
                              <span className="text-muted">
                                Solo lectura
                              </span>
                            )}

                          </td>

                        </tr>

                      )
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default AdminProductos