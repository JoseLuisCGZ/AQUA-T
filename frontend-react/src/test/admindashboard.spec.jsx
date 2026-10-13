import AdminDashboard
  from '../pages/admin/AdminDashboard'

import {
  obtenerProductos
} from '../services/productosService'

import {
  obtenerUsuarios
} from '../services/usuariosService'

import {
  montar,
  limpiarAlmacenamiento,
  iniciarSesionComo,
  esperarActualizacion
} from './utils'

describe(
  'Vista AdminDashboard',
  () => {

    let vista

    beforeEach(() => {

      limpiarAlmacenamiento()

      iniciarSesionComo(
        'Administrador',
        'Iván'
      )
    })

    afterEach(
      () => vista.desmontar()
    )

    it(
      'muestra la cantidad de productos y usuarios registrados',
      async () => {

        const productos =
          await obtenerProductos()

        const usuarios =
          await obtenerUsuarios()

        vista =
          montar(
            <AdminDashboard />
          )

        await esperarActualizacion()

        const c =
          vista.contenedor

        const numeros =
          Array.from(
            c.querySelectorAll(
              '.admin-stat-numero'
            )
          ).map(
            nodo =>
              nodo.textContent
          )

        expect(
          numeros
        ).toEqual([
          String(
            productos.length
          ),

          String(
            usuarios.length
          )
        ])
      }
    )
  }
)