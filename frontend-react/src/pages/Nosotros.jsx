import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'
import Footer from '../components/Footer'

function Nosotros() {
  return (
    <>
      <Navbar />

      <CategoryNav />

      {/* Hero original */}
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

      {/* Nosotros */}
      <section id="nosotros" className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2
              className="fw-bold"
              style={{ color: 'var(--azul-profundo)' }}
            >
              Nosotros
            </h2>

            <p
              className="text-muted mx-auto"
              style={{ maxWidth: '550px' }}
            >
              Conoce un poco más sobre quiénes somos y qué nos motiva.
            </p>

          </div>

          <div className="row align-items-stretch g-0">

            {/* Logo */}
            <div className="col-12 col-md-6 text-center d-flex align-items-center justify-content-center p-4">

              <img
                src="/assetsimg/logo.png"
                alt="Logo AQUA-T"
                className="img-fluid"
                style={{ maxWidth: '320px' }}
              />

            </div>

            {/* Quiénes somos */}
            <div className="col-12 col-md-6 d-flex align-items-center mitad-azul-nosotros p-5">

              <div>

                <h3 className="fw-bold mb-3 text-white">
                  Quiénes Somos
                </h3>

                <p className="text-white mb-0">
                  En AQUA-T nos dedicamos a ofrecer soluciones de
                  filtrado de alta calidad para piscinas, herramientas
                  para el mantenimiento y productos quimicos de
                  limpieza, combinando tecnología confiable con un
                  servicio cercano. Nuestro compromiso es entregarte
                  productos duraderos que mantengan tu piscina limpia
                  y en óptimas condiciones durante todo el año.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Calidad */}
      <section className="franja-mitad">

        <div className="row g-0">

          <div className="col-12 col-md-6 mitad-azul d-flex align-items-center justify-content-center text-center text-white p-5">

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
          >

            <div>

              <h3
                className="fw-bold mb-3"
                style={{ color: 'var(--azul-profundo)' }}
              >
                Compromiso con la calidad
              </h3>

              <p
                className="text-muted mb-0"
                style={{ maxWidth: '400px' }}
              >
                Cada filtro Vulcano pasa por rigurosos controles para
                garantizar durabilidad y un rendimiento óptimo.
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  )
}

export default Nosotros