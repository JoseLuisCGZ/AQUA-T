import Ofertas
  from '../pages/Ofertas'

import {
  obtenerProductos
} from '../services/productosService'

import {
  montar,
  limpiarAlmacenamiento,
  esperarActualizacion
} from './utils'

describe('Vista Ofertas', () => {

  let vista

  beforeEach(
    limpiarAlmacenamiento
  )

  afterEach(
    () => vista?.desmontar()
  )

  it(
    'muestra solo los productos que están en oferta',
    async () => {

      const productos =
        await obtenerProductos()

      const enOferta =
        productos.filter(
          producto =>
            producto.precioAnterior
        )

      const sinOferta =
        productos.find(
          producto =>
            !producto.precioAnterior
        )

      expect(
        enOferta.length
      ).toBeGreaterThan(0)

      vista =
        montar(
          <Ofertas />,
          {
            ruta:
              '/ofertas'
          }
        )

      await esperarActualizacion()

      const c =
        vista.contenedor

      expect(
        c.querySelector('h2')
          .textContent
      ).toBe('Ofertas')

      expect(
        c.querySelectorAll(
          '.card'
        ).length
      ).toBe(
        enOferta.length
      )

      enOferta.forEach(
        producto => {

          expect(
            c.textContent
          ).toContain(
            producto.nombre
          )
        }
      )

      expect(
        c.textContent
      ).not.toContain(
        sinOferta.nombre
      )
    }
  )
})