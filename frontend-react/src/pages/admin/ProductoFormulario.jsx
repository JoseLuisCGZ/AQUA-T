import {
  useEffect,
  useState
} from 'react'

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'

import AdminSidebar from '../../components/AdminSidebar'

import {
  categoriasProducto,
  obtenerProductoPorId,
  agregarProducto,
  actualizarProducto
} from '../../services/productosService'

import {
  validarCodigo,
  validarNombreProducto,
  validarDescripcionProducto,
  validarPrecioProducto,
  validarStockProducto,
  validarStockCritico,
  validarCategoriaProducto
} from '../../utils/validacionesProducto'

function ProductoFormulario() {

  const { id } = useParams()

  const navigate =
    useNavigate()

  const modoEdicion =
    Boolean(id)

  const estadoInicial = {
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockCritico: '',
    categoria: '',
    imagen: ''
  }

  const [formulario, setFormulario] =
    useState(estadoInicial)

  const [errores, setErrores] =
    useState({})

  const [mensaje, setMensaje] =
    useState('')

  const [productoEncontrado,
    setProductoEncontrado] =
    useState(true)

  useEffect(() => {

    if (!modoEdicion) {
      return
    }

    const producto =
      obtenerProductoPorId(id)

    if (!producto) {

      setProductoEncontrado(false)

      return
    }

    setFormulario({
      codigo:
        producto.codigo || '',

      nombre:
        producto.nombre || '',

      descripcion:
        producto.descripcion || '',

      precio:
        String(
          producto.precio ?? ''
        ),

      stock:
        String(
          producto.stock ?? ''
        ),

      stockCritico:
        producto.stockCritico ===
          null ||
        producto.stockCritico ===
          undefined
          ? ''
          : String(
              producto.stockCritico
            ),

      categoria:
        producto.categoria || '',

      imagen:
        producto.imagen || ''
    })

  }, [id, modoEdicion])

  function actualizarCampo(
    evento
  ) {

    const {
      name,
      value
    } = evento.target

    setFormulario(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function guardar(evento) {

    evento.preventDefault()

    const nuevosErrores = {

      codigo:
        validarCodigo(
          formulario.codigo
        ),

      nombre:
        validarNombreProducto(
          formulario.nombre
        ),

      descripcion:
        validarDescripcionProducto(
          formulario.descripcion
        ),

      precio:
        validarPrecioProducto(
          formulario.precio
        ),

      stock:
        validarStockProducto(
          formulario.stock
        ),

      stockCritico:
        validarStockCritico(
          formulario.stockCritico
        ),

      categoria:
        validarCategoriaProducto(
          formulario.categoria
        )
    }

    setErrores(
      nuevosErrores
    )

    const hayErrores =
      Object.values(
        nuevosErrores
      ).some(
        error => error !== ''
      )

    if (hayErrores) {

      setMensaje(
        'Ingrese la Informacion Faltante'
      )

      return
    }

    let imagen =
      formulario.imagen.trim()

    if (
      imagen !== '' &&
      !imagen.startsWith('/')
    ) {
      imagen = '/' + imagen
    }

    if (imagen === '') {
      imagen =
        '/assetsimg/logo.png'
    }

    const datos = {

      codigo:
        formulario.codigo.trim(),

      nombre:
        formulario.nombre.trim(),

      descripcion:
        formulario.descripcion.trim(),

      precio:
        Number(formulario.precio),

      stock:
        Number(formulario.stock),

      stockCritico:
        formulario.stockCritico === ''
          ? null
          : Number(
              formulario.stockCritico
            ),

      categoria:
        formulario.categoria,

      imagen
    }

    if (modoEdicion) {

      actualizarProducto(
        id,
        datos
      )

      setMensaje(
        '¡Producto actualizado con éxito!'
      )

    } else {

      agregarProducto(datos)

      setMensaje(
        '¡Producto creado con éxito!'
      )
    }

    setTimeout(() => {
      navigate(
        '/admin/productos'
      )
    }, 900)
  }

  if (!productoEncontrado) {

    return (
      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-contenido">

          <div className="admin-panel">

            <p className="text-danger">
              No se encontró el producto solicitado.
            </p>

            <Link
              to="/admin/productos"
              className="btn btn-primary"
            >
              Volver
            </Link>

          </div>

        </main>

      </div>
    )
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-contenido">

        <div className="admin-header">

          <h1>
            {modoEdicion
              ? 'Editar producto'
              : 'Nuevo producto'}
          </h1>

          <Link
            to="/admin/productos"
            className="btn btn-outline-primary"
          >
            ← Volver al listado
          </Link>

        </div>

        <div className="admin-panel">

          <form
            onSubmit={guardar}
            noValidate
          >

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Código
                </label>

                <input
                  type="text"
                  name="codigo"
                  className="form-control"
                  value={
                    formulario.codigo
                  }
                  onChange={
                    actualizarCampo
                  }
                />

                <div className="form-text">
                  Mín. 3 caracteres
                </div>

                <div className="campo-error">
                  {errores.codigo}
                </div>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  maxLength="100"
                  value={
                    formulario.nombre
                  }
                  onChange={
                    actualizarCampo
                  }
                />

                <div className="campo-error">
                  {errores.nombre}
                </div>

              </div>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Descripción (opcional)
              </label>

              <textarea
                name="descripcion"
                className="form-control"
                rows="3"
                maxLength="500"
                value={
                  formulario.descripcion
                }
                onChange={
                  actualizarCampo
                }
              />

              <div className="campo-error">
                {errores.descripcion}
              </div>

            </div>

            <div className="row">

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Precio
                </label>

                <input
                  type="number"
                  name="precio"
                  min="0"
                  className="form-control"
                  value={
                    formulario.precio
                  }
                  onChange={
                    actualizarCampo
                  }
                />

                <div className="campo-error">
                  {errores.precio}
                </div>

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  min="0"
                  step="1"
                  className="form-control"
                  value={
                    formulario.stock
                  }
                  onChange={
                    actualizarCampo
                  }
                />

                <div className="campo-error">
                  {errores.stock}
                </div>

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Stock crítico
                </label>

                <input
                  type="number"
                  name="stockCritico"
                  min="0"
                  step="1"
                  className="form-control"
                  value={
                    formulario.stockCritico
                  }
                  onChange={
                    actualizarCampo
                  }
                />

                <div className="campo-error">
                  {errores.stockCritico}
                </div>

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Categoría
                </label>

                <select
                  name="categoria"
                  className="form-select"
                  value={
                    formulario.categoria
                  }
                  onChange={
                    actualizarCampo
                  }
                >

                  <option value="">
                    -- Seleccione la categoría --
                  </option>

                  {categoriasProducto.map(
                    categoria => (

                      <option
                        key={categoria}
                        value={categoria}
                      >
                        {categoria}
                      </option>

                    )
                  )}

                </select>

                <div className="campo-error">
                  {errores.categoria}
                </div>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Imagen (opcional)
                </label>

                <input
                  type="text"
                  name="imagen"
                  className="form-control"
                  placeholder="assetsimg/nombre.jpg"
                  value={
                    formulario.imagen
                  }
                  onChange={
                    actualizarCampo
                  }
                />

              </div>

            </div>

            {mensaje && (

              <div
                className="mb-3 fw-semibold"
                style={{
                  color:
                    mensaje.startsWith('¡')
                      ? 'var(--azul-medio)'
                      : '#b3261e'
                }}
              >
                {mensaje}
              </div>

            )}

            <button
              type="submit"
              className="btn btn-enviar"
            >
              {modoEdicion
                ? 'Guardar cambios'
                : 'Guardar producto'}
            </button>

          </form>

        </div>

      </main>

    </div>
  )
}

export default ProductoFormulario