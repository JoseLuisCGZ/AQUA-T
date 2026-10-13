import {
  Routes,
  Route
} from 'react-router-dom'

import UsuarioFormulario
  from '../pages/admin/UsuarioFormulario'

import AdminUsuarios
  from '../pages/admin/AdminUsuarios'

import {
  regionesComunas
} from '../data/regiones'

import {
  obtenerUsuarios
} from '../services/usuariosService'

import {
  montar,
  llenar,
  act,
  clic,
  boton,
  limpiarAlmacenamiento,
  iniciarSesionComo,
  esperarActualizacion
} from './utils'

describe(
  'Vista UsuarioFormulario',
  () => {

    let vista

    beforeEach(() => {

      limpiarAlmacenamiento()

      iniciarSesionComo(
        'Administrador'
      )
    })

    afterEach(() => {

      try {
        jasmine.clock()
          .uninstall()
      } catch {
        // Puede no estar instalado.
      }

      vista?.desmontar()
    })

    it(
      'crea el usuario y vuelve al listado cuando los datos son válidos',
      async () => {

        const total =
          (
            await obtenerUsuarios()
          ).length

        vista =
          montar(
            <Routes>

              <Route
                path="/admin/usuarios/nuevo"
                element={
                  <UsuarioFormulario />
                }
              />

              <Route
                path="/admin/usuarios"
                element={
                  <AdminUsuarios />
                }
              />

            </Routes>,
            {
              ruta:
                '/admin/usuarios/nuevo'
            }
          )

        const c =
          vista.contenedor

        llenar(c, {
          run:
            '123456785',

          nombre:
            'Jorge',

          apellidos:
            'Gonzalez Rios',

          correo:
            'gonazales.jorge@gmail.com',

          contrasena:
            'clave123',

          tipoUsuario:
            'Vendedor',

          region:
            '0',

          comuna:
            regionesComunas[0]
              .comunas[0],

          direccion:
            'Av. Corazones 742'
        })

        jasmine.clock()
          .install()

        clic(
          boton(
            c,
            'Guardar usuario'
          )
        )

        await esperarActualizacion()

        expect(
          c.textContent
        ).toContain(
          'Usuario creado con éxito'
        )

        act(() =>
          jasmine.clock()
            .tick(900)
        )

        await esperarActualizacion()

        const usuarios =
          await obtenerUsuarios()

        expect(
          usuarios.length
        ).toBe(
          total + 1
        )

        expect(
          c.querySelector('h1')
            .textContent
        ).toBe(
          'Usuarios'
        )

        expect(
          c.textContent
        ).toContain(
          'gonazales.jorge@gmail.com'
        )
      }
    )
  }
)