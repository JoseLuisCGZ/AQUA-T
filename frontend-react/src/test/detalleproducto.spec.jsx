import DetalleProducto
  from '../pages/DetalleProducto'

import {
  obtenerCarrito
} from '../services/carritoService'

import {
  obtenerProductoPorId
} from '../services/productosService'

import {
  montar,
  clic,
  limpiarAlmacenamiento,
  esperarActualizacion
} from './utils'

describe(
  'Vista DetalleProducto',
  () => {

    let vista

    beforeEach(
      limpiarAlmacenamiento
    )

    afterEach(
      () => vista?.desmontar()
    )

    it(
      'muestra el producto y lo añade al carrito',
      async () => {

        const producto =
          await obtenerProductoPorId(
            'filtro-vulcano-20'
          )

        vista =
          montar(
            <DetalleProducto />,
            {
              ruta:
                '/productos/filtro-vulcano-20',

              patron:
                '/productos/:id'
            }
          )

        await esperarActualizacion()

        const c =
          vista.contenedor

        expect(
          c.querySelector('h1')
            .textContent
        ).toBe(
          producto.nombre
        )

        expect(
          c.textContent
        ).toContain(
          producto.descripcion
        )

        expect(
          obtenerCarrito()
            .length
        ).toBe(0)

        clic(
          c.querySelector(
            '.btn-agregar-carrito'
          )
        )

        const carrito =
          obtenerCarrito()

        expect(
          carrito.length
        ).toBe(1)

        expect(
          carrito[0].id
        ).toBe(
          'filtro-vulcano-20'
        )
      }
    )
  }
)