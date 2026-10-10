import { useState } from 'react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../components/AdminSidebar'

import {
  obtenerUsuarios,
  eliminarUsuario
} from '../../services/usuariosService'

function AdminUsuarios() {

  const [usuarios, setUsuarios] =
    useState(obtenerUsuarios())

  function claseRol(tipo) {

    if (tipo === 'Administrador') {
      return 'bg-primary'
    }

    if (tipo === 'Vendedor') {
      return 'bg-info text-dark'
    }

    return 'bg-secondary'
  }

  function eliminar(id) {

    const usuario =
      usuarios.find(
        usuario =>
          usuario.id === Number(id)
      )

    if (!usuario) {
      return
    }

    const confirmar =
      window.confirm(
        `¿Eliminar al usuario "${usuario.nombre} ${usuario.apellidos}"? Esta acción no se puede deshacer.`
      )

    if (!confirmar) {
      return
    }

    const nuevaLista =
      eliminarUsuario(id)

    setUsuarios(nuevaLista)
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-contenido">

        <div className="admin-header">

          <h1>
            Usuarios
          </h1>

          <Link
            to="/admin/usuarios/nuevo"
            className="btn btn-enviar"
          >
            + Nuevo usuario
          </Link>

        </div>

        <div className="admin-panel">

          {usuarios.length === 0 ? (

            <p className="text-muted text-center mb-0">
              Todavía no hay usuarios registrados.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table admin-tabla">

                <thead>
                  <tr>
                    <th>RUN</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Tipo de usuario</th>
                    <th>Comuna</th>

                    <th className="text-end">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {usuarios.map(usuario => (

                    <tr key={usuario.id}>

                      <td>
                        {usuario.run}
                      </td>

                      <td>
                        {usuario.nombre}
                      </td>

                      <td>
                        {usuario.apellidos}
                      </td>

                      <td>
                        {usuario.correo}
                      </td>

                      <td>
                        <span
                          className={`badge ${claseRol(
                            usuario.tipoUsuario
                          )}`}
                        >
                          {usuario.tipoUsuario}
                        </span>
                      </td>

                      <td>
                        {usuario.comuna || '-'}
                      </td>

                      <td className="text-end">

                        <Link
                          to={`/admin/usuarios/${usuario.id}/editar`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            eliminar(usuario.id)
                          }
                        >
                          Eliminar
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default AdminUsuarios