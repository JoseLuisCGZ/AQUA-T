import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const productos = [
    {
      id: "filtro-vulcano-20",
      nombre: "Filtro VC VULCANO 20",
      categoria: "Filtro Vulcano",
      precio: "$120.000",
      precioNum: 120000,
      imagen: "assetsimg/filtro1.jpg"
    },
    // ... rest de tu arreglo de productos
  ];

  return (
    <>
      <nav className="navbar navbar-expand navbar-custom sticky-top">
        <div className="container d-flex flex-nowrap align-items-center">
          <Link className="navbar-brand flex-shrink-0" to="/">
            <img src="assetsimg/logo.png" alt="Logo de la empresa" />
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
                <span id="contadorCarrito" className="badge-carrito" style={{ display: 'none' }}>0</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Subnav de categorías */}
      <div className="subnav-categorias">
        <div className="container">
          <ul className="nav flex-nowrap">
            <li className="nav-item"><Link className="nav-link" to="/productos">Filtros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Bombas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Ver todos</Link></li>
            <div className="nav flex-nowrap ms-auto d-flex">
              <li className="nav-item"><Link className="nav-link" to="/login">Inicia sesión</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/registro">Regístrate</Link></li>
            </div>
          </ul>
        </div>
      </div>

      {/* Hero Header */}
      <header className="hero-productos d-flex align-items-center justify-content-center text-center text-white">
        <div className="hero-overlay"></div>
        <div className="container position-relative py-5">
          <h1 className="display-5 fw-bold mb-3">AQUA-T</h1>
          <p className="lead mx-auto" style={{ maxWidth: '650px' }}>
            Filtros de piscina diseñados para mantener tu agua limpia y cristalina todo el año.
          </p>
        </div>
      </header>

      {/* Grilla de productos */}
      <div className="container my-4">
        <div className="row g-4">
          {productos.map((prod) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <div className="card h-100">
                <img src={prod.imagen} className="card-img-top" alt={prod.nombre} />
                <div className="card-body text-center">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="text-primary">{prod.categoria}</p>
                  {prod.precioAnterior && (
                    <p className="mb-1 text-decoration-line-through text-muted">{prod.precioAnterior}</p>
                  )}
                  <p className={`fw-bold ${prod.descuento ? 'text-danger' : ''}`}>{prod.precio}</p>
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