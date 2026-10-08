import React from 'react';
import { Link } from 'react-router-dom';

export default function Productos() {
  const listaProductos = [
    { id: "filtro-vulcano-20", nombre: "Filtro VC VULCANO 20", categoria: "Filtro Vulcano", precio: "$120.000", imagen: "assetsimg/filtro1.jpg" },
    { id: "filtro-vulcano-30", nombre: "Filtro VC VULCANO 30", categoria: "Filtro Vulcano", precio: "$140.000", imagen: "assetsimg/filtro2.jpg" },
    { id: "filtro-vulcano-50", nombre: "Filtro VC VULCANO 50", categoria: "Filtro Vulcano 50", precio: "$160.000", imagen: "assetsimg/filtro3.jpg" },
    { id: "equipo-limpiado", nombre: "Equipo de limpiado", categoria: "Equipo de limpiado y aspirado", precio: "$499.990", imagen: "assetsimg/equipofiltro.jpg" },
    { id: "filtro-tripack-intex", nombre: "Filtro Piscina A Tripack Intex", categoria: "Filtro Piscina A Tripack Intex", precioAnterior: "$5.990", precio: "$1.797", imagen: "assetsimg/filtrochico.webp", descuento: "-70%" },
    { id: "lona-cobertor", nombre: "Cobertor De Piscina, Lona Multiuso 4x7 Mts", categoria: "Cobertor De Piscina, Lona Multiuso", precio: "$149.990", imagen: "assetsimg/lona.webp" },
    { id: "bomba-apm37", nombre: "Bomba periférica APm37 0,5Hp 220V Leo", categoria: "Bomba periférica", precio: "$80.000", imagen: "assetsimg/bomba.webp" },
    { id: "piscina-bestway-gris", nombre: "Piscina Estructural Redonda Bestway Gris", categoria: "+bomba+cobertor+escalera", precio: "$599.990", imagen: "assetsimg/piscina.webp" }
  ];

  return (
    <>
      {/* Navegación Principal */}
      <nav className="navbar navbar-expand navbar-custom sticky-top">
        <div className="container d-flex flex-nowrap align-items-center">
          <Link className="navbar-brand flex-shrink-0" to="/">
            <img alt="Logo de la empresa" src="assetsimg/logo.png" />
            AQUA-T
          </Link>
          <ul className="navbar-nav flex-row ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link active" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/blogs">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/contacto">Contacto</Link></li>
            <li className="nav-item">
              <Link className="icono-carrito" to="/carrito">
                🛒 Carrito
                <span className="badge-carrito" id="contadorCarrito" style={{ display: "none" }}>0</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Subnav Categorías */}
      <div className="subnav-categorias">
        <div className="container">
          <ul className="nav flex-nowrap">
            <li className="nav-item"><Link className="nav-link" to="/productos">Filtros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Bombas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Accesorios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Piscinas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Químicos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Ver todos</Link></li>
          </ul>
        </div>
      </div>

      {/* Título de la página */}
      <div className="text-center mb-4 mt-4">
        <h2 className="fw-bold" style={{ color: "var(--azul-profundo)" }}>Nuestros Productos</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "550px" }}>
          Conoce nuestra línea de filtros y equipo de limpieza, disponibles en distintos tamaños.
        </p>
      </div>

      {/* Grilla de productos dinámica */}
      <div className="container my-4">
        <div className="row g-4">
          {listaProductos.map((prod) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <div className="card h-100">
                <img alt={prod.nombre} className="card-img-top" src={prod.imagen} />
                <div className="card-body text-center">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="text-primary">{prod.categoria}</p>
                  {prod.precioAnterior && (
                    <p className="mb-1 text-decoration-line-through text-muted">{prod.precioAnterior}</p>
                  )}
                  <p className={`fw-bold ${prod.descuento ? 'text-danger' : ''}`}>{prod.precio}</p>
                  {prod.descuento && <span className="badge bg-danger mb-2">{prod.descuento}</span>}
                  <button className="btn btn-primary btn-agregar-carrito">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center py-4 bg-light">
        <p className="mb-0">© 2026 AQUA-T Derechos Reservados</p>
      </footer>
    </>
  );
}