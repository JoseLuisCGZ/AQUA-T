import { useState } from 'react'
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
    useState(obtenerProductos())

  function eliminar(id) {

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

    const nuevaLista =
      eliminarProducto(id)

    setProductos(nuevaLista)
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