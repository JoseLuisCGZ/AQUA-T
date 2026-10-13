import Login from '../pages/Login'

import {
  montar,
  escribir,
  clic,
  boton,
  limpiarAlmacenamiento,
  esperarActualizacion
} from './utils'

describe('Vista Login', () => {

  let vista

  beforeEach(
    limpiarAlmacenamiento
  )

  afterEach(
    () => vista.desmontar()
  )

  it(
    'rechaza una contraseña incorrecta y no inicia sesión',
    async () => {

      vista =
        montar(<Login />)

      const c =
        vista.contenedor

      escribir(
        c.querySelector(
          '#emailUsuario'
        ),
        'ivan.rivera@duoc.cl'
      )

      escribir(
        c.querySelector(
          '#contrasena'
        ),
        'incorrecta1'
      )

      clic(
        boton(
          c,
          'Iniciar sesión'
        )
      )

      await esperarActualizacion()

      expect(
        c.textContent
      ).toContain(
        'Correo o contraseña incorrectos'
      )

      expect(
        sessionStorage.getItem(
          'aquaT_sesion'
        )
      ).toBeNull()
    }
  )
})