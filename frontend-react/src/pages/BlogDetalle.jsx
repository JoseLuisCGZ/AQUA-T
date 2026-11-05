import { Link, useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'

import { blogs } from '../data/blogs'

function BlogDetalle() {

  const { slug } = useParams()

  const blog = blogs.find(
    blog => blog.slug === slug
  )

  if (!blog) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">

          <h1>Artículo no encontrado</h1>

          <Link
            to="/blogs"
            className="btn btn-primary mt-3"
          >
            Volver al blog
          </Link>

        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section className="contacto-section">

        <div className="blog-articulo">

          <Link
            to="/blogs"
            className="volver"
          >
            ← Volver al blog
          </Link>

          <img
            src={blog.imagen}
            alt={blog.alt}
          />

          <span className="badge-caso">
            {blog.caso}
          </span>

          <h1>
            {blog.titulo}
          </h1>

          <p>
            {blog.introduccion}
          </p>

          {blog.secciones.map(seccion => (

            <div key={seccion.titulo}>

              <h2 className="h4 mt-4">
                {seccion.titulo}
              </h2>

              <p>
                {seccion.contenido}
              </p>

            </div>

          ))}

          <p className="mt-4">

            {blog.enlaceFinal.textoAntes}

            <Link to={blog.enlaceFinal.ruta}>
              {blog.enlaceFinal.textoLink}
            </Link>

            {blog.enlaceFinal.textoDespues}

          </p>

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

export default BlogDetalle