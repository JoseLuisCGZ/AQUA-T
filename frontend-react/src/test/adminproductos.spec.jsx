import AdminProductos
  from '../pages/admin/AdminProductos'

import {
  obtenerProductos
} from '../services/productosService'

import {
  montar,
  clic,
  boton,
  limpiarAlmacenamiento,
  iniciarSesionComo,
  esperarActualizacion
} from './utils'

describe('Vista AdminProductos', () => {

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
    'elimina un producto cuando se confirma la acción',
    async () => {

      const iniciales =
        await obtenerProductos()

      vista =
        montar(
          <AdminProductos />
        )

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
        await obtenerProductos()

      expect(
        restantes.length
      ).toBe(
        iniciales.length - 1
      )
    }
  )
})