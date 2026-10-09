import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import ProductoCard from '../components/ProductoCard'

import { productos } from '../data/productos'
import { agregarAlCarrito } from '../services/carritoService'

function Home() {

  const idsDestacados = [
    'filtro-vulcano-20',
    'filtro-vulcano-30',
    'filtro-vulcano-50',
    'equipo-limpiado',
    'filtro-tripack-intex',
    'lona-cobertor',
    'clarificador-piscina',
    'bomba-apm37'
  ]

  const productosDestacados = idsDestacados
    .map(id => productos.find(producto => producto.id === id))
    .filter(Boolean)

  useEffect(() => {
    const elementos = document.querySelectorAll('[data-animate]')

    if (!('IntersectionObserver' in window)) {
      elementos.forEach(elemento => {
        elemento.classList.add('in-view')
      })

      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15
      }
    )

    elementos.forEach(elemento => observer.observe(elemento))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      <CategoryNav mostrarAuth />

      {/* HERO ORIGINAL */}
      <header className="hero-productos d-flex align-items-center justify-content-center text-center text-white">
        <div className="hero-overlay"></div>

        <div className="container position-relative py-5">

          <h1 className="display-5 fw-bold mb-3">
            AQUA-T
          </h1>

          <p
            className="lead mx-auto"
            style={{ maxWidth: '650px' }}
          >
            Filtros de piscina diseñados para mantener tu agua limpia
            y cristalina todo el año. Encuentra el modelo ideal según
            el tamaño de tu piscina y disfruta de un mantenimiento
            simple, eficiente y duradero.
          </p>

        </div>
      </header>

      {/* TÍTULO PRODUCTOS */}
      <div className="container my-4">

        <div className="text-center mb-4">

          <h2
            className="fw-bold"
            style={{ color: 'var(--azul-profundo)' }}
          >
            Nuestros Productos
          </h2>

          <p
            className="text-muted mx-auto"
            style={{ maxWidth: '550px' }}
          >
            Conoce nuestra línea de filtros, bombas y equipo de limpieza,
            disponibles en distintos tamaños para adaptarse a las
            necesidades de tu piscina.
          </p>

        </div>

      </div>

      {/* LOS 8 PRODUCTOS QUE TENÍA EL HOME ORIGINAL */}
      <div className="container my-4">

        <div className="row g-4">

          {productosDestacados.map(producto => (

            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={producto.id}
            >

              <ProductoCard
                producto={producto}
                onAgregar={agregarAlCarrito}
              />

            </div>

          ))}

          {/* TARJETA VER MÁS ORIGINAL */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">

            <div className="card h-100 d-flex align-items-center justify-content-center">

              <div className="card-body text-center d-flex flex-column justify-content-center">

                <Link
                  to="/productos"
                  className="btn btn-primary"
                >
                  Ver más
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CALIDAD / POR QUÉ ELEGIRNOS */}
      <section className="franja-mitad">

        <div className="row g-0">

          <div
            className="col-12 col-md-6 mitad-azul d-flex align-items-center justify-content-center text-center text-white p-5"
            data-animate="1"
          >

            <div>

              <h3 className="fw-bold mb-3">
                Calidad que se nota
              </h3>

              <p
                className="mb-0"
                style={{ maxWidth: '400px' }}
              >
                Más de 10 años entregando soluciones de filtrado
                confiables para piscinas en todo el país.
              </p>

            </div>

          </div>

          <div
            className="col-12 col-md-6 d-flex align-items-center justify-content-center text-center p-5"
            style={{ backgroundColor: '#ffffff' }}
            data-animate="2"
          >

            <div>

              <h3
                className="fw-bold mb-3"
                style={{ color: 'var(--azul-profundo)' }}
              >
                ¿Por qué elegirnos?
              </h3>

              <ul
                className="list-unstyled text-start mx-auto"
                style={{
                  maxWidth: '320px',
                  color: 'var(--texto)'
                }}
              >

                <li className="mb-2">
                  ✅ Envío a todo Chile
                </li>

                <li className="mb-2">
                  ✅ Garantía de fábrica
                </li>

                <li className="mb-2">
                  ✅ Atención personalizada
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* DESCUENTO */}
      <section className="franja-mitad">

        <div className="row g-0">

          <div
            className="col-12 col-md-6 d-flex align-items-center justify-content-center p-5"
            style={{ backgroundColor: '#ffffff' }}
            data-animate="1"
          >

            <img
              src="/assetsimg/images.jpg"
              alt="Descuento en productos seleccionados"
              style={{ maxWidth: '320px' }}
            />

          </div>

          <div
            className="col-12 col-md-6 mitad-azul d-flex align-items-center justify-content-center text-center text-white p-5"
            data-animate="2"
          >

            <div>

              <h3 className="fw-bold mb-3">
                DESCUENTO OMG!!!
              </h3>

              <p
                className="mb-4"
                style={{ maxWidth: '380px' }}
              >
                Hasta 70% de descuento en productos seleccionados.
                Aprovecha antes que se acaben.
              </p>

              <Link
                to="/productos"
                className="btn btn-aqua"
              >
                Ver productos
              </Link>

            </div>

          </div>

        </div>

      </section>

      <footer>
        <p className="mb-0">
          © 2026 AQUA-T Derechos Reservados
        </p>
      </footer>
    </>
  )
}

export default Home