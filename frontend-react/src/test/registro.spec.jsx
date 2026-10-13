import Registro from '../pages/Registro'

import {
  regionesComunas
} from '../data/regiones'

import {
  obtenerUsuarios
} from '../services/usuariosService'

import {
  montar,
  llenar,
  clic,
  boton,
  limpiarAlmacenamiento,
  esperarActualizacion
} from './utils'

describe('Vista Registro', () => {

  let vista

  beforeEach(
    limpiarAlmacenamiento
  )

  afterEach(
    () => vista.desmontar()
  )

  it(
    'crea el usuario como Cliente y limpia el formulario',
    async () => {

      const antes =
        (await obtenerUsuarios())
          .length

      vista =
        montar(<Registro />)

      const c =
        vista.contenedor

      llenar(c, {
        run:
          '123456785',

        nombre:
          'Alex',

        apellidos:
          'Turner Turner',

        correo:
          'turner.alex@gmail.com',

        contrasena:
          'clave123',

        confirmarContrasena:
          'clave123',

        telefono:
          '912345678',

        fechaNacimiento:
          '1986-01-06',

        region:
          '0',

        comuna:
          regionesComunas[0]
            .comunas[0],

        direccion:
          'Calle Humbug 123'
      })

      clic(
        boton(
          c,
          'Registrar'
        )
      )

      await esperarActualizacion()

      expect(
        c.textContent
      ).toContain(
        '¡Registro exitoso! Bienvenido/a Alex.'
      )

      const usuarios =
        await obtenerUsuarios()

      expect(
        usuarios.length
      ).toBe(
        antes + 1
      )

      const creado =
        usuarios.find(
          usuario =>
            usuario.correo ===
            'turner.alex@gmail.com'
        )

      expect(creado)
        .toBeDefined()

      expect(
        creado.tipoUsuario
      ).toBe('Cliente')

      expect(
        c.querySelector(
          '[name="run"]'
        ).value
      ).toBe('')

      expect(
        c.querySelector(
          '[name="correo"]'
        ).value
      ).toBe('')
    }
  )
})