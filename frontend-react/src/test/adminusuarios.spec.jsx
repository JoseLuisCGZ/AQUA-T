import AdminUsuarios
  from '../pages/admin/AdminUsuarios'

import {
  obtenerUsuarios
} from '../services/usuariosService'

import {
  montar,
  clic,
  boton,
  limpiarAlmacenamiento,
  iniciarSesionComo,
  esperarActualizacion
} from './utils'

describe('Vista AdminUsuarios', () => {

  let vista

  beforeEach(() => {

    limpiarAlmacenamiento()

    iniciarSesionComo(
      'Administrador'
    )
  })

  afterEach(
    () => vista?.desmontar()
  )

  it(
    'elimina un usuario cuando se confirma la acción',
    async () => {

      const iniciales =
        await obtenerUsuarios()

      vista =
        montar(<AdminUsuarios />)

      await esperarActualizacion()

      const c =
        vista.contenedor

      expect(
        c.querySelectorAll(
          'tbody tr'
        ).length
      ).toBe(
        iniciales.length
      )

      spyOn(
        window,
        'confirm'
      ).and.returnValue(true)

      clic(
        boton(
          c,
          'Eliminar'
        )
      )

      await esperarActualizacion()

      expect(
        window.confirm
      ).toHaveBeenCalled()

      expect(
        c.querySelectorAll(
          'tbody tr'
        ).length
      ).toBe(
        iniciales.length - 1
      )

      const restantes =
        await obtenerUsuarios()

      expect(
        restantes.length
      ).toBe(
        iniciales.length - 1
      )
    }
  )
})