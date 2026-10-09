import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import CategoryNav from '../components/CategoryNav'

import { blogs } from '../data/blogs'

function Blogs() {
  return (
    <>
      <Navbar />

      <CategoryNav />

      <header className="hero-productos d-flex align-items-center justify-content-center text-center text-white">

        <div className="hero-overlay"></div>

        <div className="container position-relative py-5">

          <h1 className="display-5 fw-bold mb-3">
            Blog AQUA-T
          </h1>

          <p
            className="lead mx-auto"
            style={{ maxWidth: '650px' }}
          >
            Consejos, novedades y datos curiosos para mantener tu
            piscina impecable todo el año.
          </p>

        </div>

      </header>

      <section className="panel-claro py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2
              className="fw-bold"
              style={{ color: 'var(--azul-profundo)' }}
            >
              Noticias importantes
            </h2>

          </div>

          <div className="row g-4">

            {blogs.map(blog => (

              <div
                className="col-12 col-md-6"
                key={blog.slug}
              >

                <div className="blog-card h-100">

                  <img
                    src={blog.imagen}
                    alt={blog.alt}
                  />

                  <div className="p-4">

                    <span className="badge-caso">
                      {blog.caso}
                    </span>

                    <h4 className="h5 mb-2">
                      {blog.titulo}
                    </h4>

                    <p className="text-muted">
                      {blog.resumen}
                    </p>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="btn btn-primary"
                    >
                      Ver caso
                    </Link>

                  </div>

                </div>

              </div>

            ))}

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

export default Blogs