import Productos
  from '../pages/Productos'

import {
  obtenerProductos
} from '../services/productosService'

import {
  montar,
  limpiarAlmacenamiento,
  esperarActualizacion
} from './utils'

describe('Vista Productos', () => {

  let vista

  beforeEach(
    limpiarAlmacenamiento
  )

  afterEach(
    () => vista.desmontar()
  )

  it(
    'filtra los productos cuando la URL trae ?categoria=',
    async () => {

      const productos =
        await obtenerProductos()

      const bombas =
        productos.filter(
          producto =>
            producto.categoria ===
            'Bombas'
        )

      vista =
        montar(
          <Productos />,
          {
            ruta:
              '/productos?categoria=Bombas'
          }
        )

      await esperarActualizacion()

      const c =
        vista.contenedor

      expect(
        c.querySelectorAll(
          '.btn-agregar-carrito'
        ).length
      ).toBe(
        bombas.length
      )

      expect(
        c.textContent
      ).toContain(
        'Nuestros productos: Bombas'
      )

      expect(
        c.textContent
      ).not.toContain(
        'Filtro VC VULCANO'
      )
    }
  )
})