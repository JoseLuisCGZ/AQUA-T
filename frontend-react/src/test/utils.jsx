import { act } from 'react'
import { createRoot } from 'react-dom/client'
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom'

import {
  productos as productosBase
} from '../data/productos'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

export { act }

let apiProductos = []
let apiUsuarios = []
let apiPedidos = []

function reiniciarApiMock() {

  apiProductos =
    productosBase.map(
      (producto, index) => ({
        ...producto,

        codigo:
          `AQT-${String(index + 1)
            .padStart(3, '0')}`,

        stock:
          producto.stock ?? 20,

        stockCritico:
          producto.stockCritico ?? 5,

        precioAnterior:
          producto.precioAnterior ?? null
      })
    )

  apiUsuarios = [
    {
      id: 1,
      run: '211567899',
      nombre: 'Iván',
      apellidos: 'Rivera',
      correo: 'ivan.rivera@duoc.cl',
      contrasena: '123456',
      telefono: '',
      fechaNacimiento: '2002-10-25',
      tipoUsuario: 'Administrador',
      region:
        'Región Metropolitana de Santiago',
      comuna: 'Santiago',
      direccion: 'Lomas Ticas 123'
    },
    {
      id: 2,
      run: '128493456',
      nombre: 'Jose',
      apellidos: 'Cornejo',
      correo: 'jose.cornejo@gmail.com',
      contrasena: '123456',
      telefono: '',
      fechaNacimiento: '1998-11-02',
      tipoUsuario: 'Vendedor',
      region:
        'Región Metropolitana de Santiago',
      comuna: 'Puente Alto',
      direccion: 'Puente Asalto 456'
    },
    {
      id: 3,
      run: '205671234',
      nombre: 'Jose',
      apellidos: 'Cisternas',
      correo: 'jose.cisternas@gmail.com',
      contrasena: '123456',
      telefono: '',
      fechaNacimiento: '2000-02-20',
      tipoUsuario: 'Cliente',
      region: 'Región del Biobío',
      comuna: 'Concepción',
      direccion: 'Lomas turbas 789'
    }
  ]

  apiPedidos = []
}

function clonar(datos) {

  if (
    datos === undefined ||
    datos === null
  ) {
    return datos
  }

  return JSON.parse(
    JSON.stringify(datos)
  )
}

function respuesta(
  datos,
  status = 200
) {

  return Promise.resolve({
    ok:
      status >= 200 &&
      status < 300,

    status,

    json:
      async () =>
        clonar(datos)
  })
}

function generarSlug(texto) {

  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .replace(
      /[^a-z0-9]+/g,
      '-'
    )
    .replace(
      /^-|-$/g,
      ''
    )
}

function mockFetch(
  url,
  opciones = {}
) {

  const ruta =
    String(url)
      .replace(
        'http://localhost:3001',
        ''
      )

  const metodo =
    (opciones.method || 'GET')
      .toUpperCase()

  // PRODUCTOS

  if (
    ruta === '/api/productos' &&
    metodo === 'GET'
  ) {

    return respuesta(
      apiProductos
    )
  }

  if (
    ruta === '/api/productos' &&
    metodo === 'POST'
  ) {

    const datos =
      JSON.parse(
        opciones.body
      )

    const id =
      datos.id ||
      generarSlug(
        datos.nombre
      )

    const nuevo = {
      id,
      ...datos,
      precioAnterior:
        datos.precioAnterior ?? null,
      stock:
        Number(datos.stock ?? 0),
      stockCritico:
        datos.stockCritico === null
          ? null
          : Number(
              datos.stockCritico ?? 0
            )
    }

    apiProductos.push(
      nuevo
    )

    return respuesta(
      { id },
      201
    )
  }

  const productoMatch =
    ruta.match(
      /^\/api\/productos\/(.+)$/
    )

  if (productoMatch) {

    const id =
      decodeURIComponent(
        productoMatch[1]
      )

    const indice =
      apiProductos.findIndex(
        producto =>
          String(producto.id) ===
          String(id)
      )

    if (
      metodo === 'GET'
    ) {

      if (indice === -1) {
        return respuesta(
          {
            error:
              'Producto no encontrado'
          },
          404
        )
      }

      return respuesta(
        apiProductos[indice]
      )
    }

    if (
      metodo === 'PUT'
    ) {

      if (indice === -1) {
        return respuesta(
          {},
          404
        )
      }

      const datos =
        JSON.parse(
          opciones.body
        )

      apiProductos[indice] = {
        ...apiProductos[indice],
        ...datos,
        id
      }

      return respuesta(
        null,
        204
      )
    }

    if (
      metodo === 'DELETE'
    ) {

      if (indice === -1) {
        return respuesta(
          {},
          404
        )
      }

      apiProductos.splice(
        indice,
        1
      )

      return respuesta(
        null,
        204
      )
    }
  }

  // USUARIOS

  if (
    ruta ===
      '/api/usuarios/login' &&
    metodo === 'POST'
  ) {

    const datos =
      JSON.parse(
        opciones.body
      )

    const usuario =
      apiUsuarios.find(
        item =>
          item.correo ===
          datos.correo &&
          item.contrasena ===
          datos.contrasena
      )

    if (!usuario) {

      return respuesta(
        {
          error:
            'Credenciales inválidas'
        },
        401
      )
    }

    const {
      contrasena,
      ...usuarioSeguro
    } = usuario

    return respuesta(
      usuarioSeguro
    )
  }

  if (
    ruta === '/api/usuarios' &&
    metodo === 'GET'
  ) {

    return respuesta(
      apiUsuarios.map(
        ({
          contrasena,
          ...usuario
        }) => usuario
      )
    )
  }

  if (
    ruta === '/api/usuarios' &&
    metodo === 'POST'
  ) {

    const datos =
      JSON.parse(
        opciones.body
      )

    const duplicado =
      apiUsuarios.some(
        usuario =>
          usuario.run ===
            datos.run ||
          usuario.correo ===
            datos.correo
      )

    if (duplicado) {

      return respuesta(
        {
          error:
            'RUN o correo ya existe'
        },
        409
      )
    }

    const id =
      apiUsuarios.length === 0
        ? 1
        : Math.max(
            ...apiUsuarios.map(
              usuario =>
                usuario.id
            )
          ) + 1

    apiUsuarios.push({
      id,
      ...datos
    })

    return respuesta(
      { id },
      201
    )
  }

  const usuarioMatch =
    ruta.match(
      /^\/api\/usuarios\/(\d+)$/
    )

  if (usuarioMatch) {

    const id =
      Number(
        usuarioMatch[1]
      )

    const indice =
      apiUsuarios.findIndex(
        usuario =>
          usuario.id === id
      )

    if (
      metodo === 'GET'
    ) {

      if (indice === -1) {

        return respuesta(
          {
            error:
              'Usuario no encontrado'
          },
          404
        )
      }

      const {
        contrasena,
        ...usuarioSeguro
      } =
        apiUsuarios[indice]

      return respuesta(
        usuarioSeguro
      )
    }

    if (
      metodo === 'PUT'
    ) {

      if (indice === -1) {
        return respuesta(
          {},
          404
        )
      }

      const datos =
        JSON.parse(
          opciones.body
        )

      apiUsuarios[indice] = {
        ...apiUsuarios[indice],
        ...datos,
        id,

        contrasena:
          datos.contrasena ||
          apiUsuarios[indice]
            .contrasena
      }

      return respuesta(
        null,
        204
      )
    }

    if (
      metodo === 'DELETE'
    ) {

      if (indice === -1) {
        return respuesta(
          {},
          404
        )
      }

      apiUsuarios.splice(
        indice,
        1
      )

      return respuesta(
        null,
        204
      )
    }
  }

  // PEDIDOS

  if (
    ruta === '/api/pedidos' &&
    metodo === 'GET'
  ) {

    return respuesta(
      apiPedidos
    )
  }

  if (
    ruta === '/api/pedidos' &&
    metodo === 'POST'
  ) {

    const datos =
      JSON.parse(
        opciones.body
      )

    const id =
      apiPedidos.length === 0
        ? 1
        : Math.max(
            ...apiPedidos.map(
              pedido =>
                pedido.id
            )
          ) + 1

    const nuevoPedido = {
      id,
      fecha:
        new Date()
          .toISOString(),
      estado:
        'Confirmado',
      ...datos
    }

    apiPedidos.push(
      nuevoPedido
    )

    return respuesta(
      {
        id,
        subtotal:
          datos.subtotal ?? 0,
        descuento:
          datos.descuento ?? 0,
        total:
          datos.total ?? 0
      },
      201
    )
  }

  return respuesta(
    {
      error:
        `Ruta no simulada: ${ruta}`
    },
    404
  )
}

export function montar(
  vista,
  {
    ruta = '/',
    patron = null
  } = {}
) {

  const contenedor =
    document.createElement(
      'div'
    )

  document.body.appendChild(
    contenedor
  )

  const root =
    createRoot(
      contenedor
    )

  const contenido =
    patron
      ? (
        <Routes>
          <Route
            path={patron}
            element={vista}
          />
        </Routes>
      )
      : vista

  act(() =>
    root.render(
      <MemoryRouter
        initialEntries={[
          ruta
        ]}
      >
        {contenido}
      </MemoryRouter>
    )
  )

  return {
    contenedor,

    desmontar() {

      act(() =>
        root.unmount()
      )

      contenedor.remove()
    }
  }
}

export function escribir(
  campo,
  valor
) {

  const prototipo =
    campo instanceof
      HTMLSelectElement
      ? HTMLSelectElement.prototype
      : campo instanceof
          HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype

  const asignar =
    Object.getOwnPropertyDescriptor(
      prototipo,
      'value'
    ).set

  act(() => {

    asignar.call(
      campo,
      valor
    )

    campo.dispatchEvent(
      new Event(
        campo instanceof
          HTMLSelectElement
          ? 'change'
          : 'input',
        {
          bubbles: true
        }
      )
    )
  })
}

export function llenar(
  contenedor,
  datos
) {

  Object.entries(
    datos
  ).forEach(
    ([nombre, valor]) => {

      const campo =
        contenedor.querySelector(
          `[name="${nombre}"]`
        )

      if (
        campo.type ===
        'checkbox'
      ) {

        if (
          campo.checked !==
          valor
        ) {

          act(() =>
            campo.click()
          )
        }

      } else {

        escribir(
          campo,
          valor
        )
      }
    }
  )
}

export function clic(
  elemento
) {

  act(() =>
    elemento.click()
  )
}

export function boton(
  contenedor,
  texto
) {

  return Array.from(
    contenedor
      .querySelectorAll(
        'button'
      )
  ).find(
    boton =>
      boton.textContent
        .trim() === texto
  )
}

export async function esperarActualizacion() {

  await act(async () => {

    for (
      let i = 0;
      i < 30;
      i++
    ) {
      await Promise.resolve()
    }

  })
}

export function limpiarAlmacenamiento() {

  localStorage.clear()
  sessionStorage.clear()

  reiniciarApiMock()

  spyOn(
    window,
    'fetch'
  ).and.callFake(
    mockFetch
  )
}

export function iniciarSesionComo(
  tipoUsuario,
  nombre = 'Tester'
) {

  sessionStorage.setItem(
    'aquaT_sesion',
    JSON.stringify({
      id: 1,
      correo:
        'test@duoc.cl',
      nombre,
      tipoUsuario
    })
  )
}

export function cargarCarrito(
  items
) {

  localStorage.setItem(
    'aquaCarrito',
    JSON.stringify(items)
  )
}

export const PRODUCTO_EJEMPLO = {
  id:
    'filtro-vulcano-20',

  nombre:
    'Filtro VC VULCANO 20',

  precio:
    120000,

  imagen:
    '/assetsimg/filtro1.jpg',

  cantidad:
    1
}