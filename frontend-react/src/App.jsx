import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import React from 'react';



export default function App() {
  
  const productos = [
    {
      id: "filtro-vulcano-20",
      nombre: "Filtro VC VULCANO 20",
      categoria: "Filtro Vulcano",
      precio: "$120.000",
      precioNum: 120000,
      imagen: "assetsimg/filtro1.jpg"
    },
    {
      id: "filtro-vulcano-30",
      nombre: "Filtro VC VULCANO 30",
      categoria: "Filtro Vulcano",
      precio: "$140.000",
      precioNum: 140000,
      imagen: "assetsimg/filtro2.jpg"
    },
    {
      id: "filtro-vulcano-50",
      nombre: "Filtro VC VULCANO 50",
      categoria: "Filtro Vulcano 50",
      precio: "$160.000",
      precioNum: 160000,
      imagen: "assetsimg/filtro3.jpg"
    },
    {
      id: "equipo-limpiado",
      nombre: "Equipo de limpiado",
      categoria: "Equipo de limpiado y aspirado",
      precio: "$499.990",
      precioNum: 499990,
      imagen: "assetsimg/equipofiltro.jpg"
    },
    {
      id: "filtro-tripack-intex",
      nombre: "Filtro Piscina A Tripack Intex",
      categoria: "Filtro Piscina A Tripack Intex",
      precioAnterior: "$5.990",
      precio: "$1.797",
      precioNum: 1797,
      imagen: "assetsimg/filtrochico.webp",
      descuento: "-70%"
    },
    {
      id: "lona-cobertor",
      nombre: "Cobertor De Piscina, Lona Multiuso 4x7 Mts, Con Ojetillos",
      categoria: "Cobertor De Piscina, Lona Multiuso marca KUANGYE",
      precio: "$149.990",
      precioNum: 149990,
      imagen: "assetsimg/lona.webp"
    },
    {
      id: "clarificador-piscina",
      nombre: "Clarificador para Piscina Granulado 1 Bolsa",
      categoria: "Mantenimiento",
      precioAnterior: "$7.990",
      precio: "$2.397",
      precioNum: 2397,
      imagen: "assetsimg/clarificador.webp",
      descuento: "-70%"
    },
    {
      id: "bomba-apm37",
      nombre: "Bomba periférica APm37 0,5Hp 220V Leo",
      categoria: "Bomba periférica APm37 0,5Hp 220V Leo",
      precio: "$80.000",
      precioNum: 80000,
      imagen: "assetsimg/bomba.webp"
    }
  ];

  return (
    <>
      
      <nav className="navbar navbar-expand navbar-custom sticky-top">
        <div className="container d-flex flex-nowrap align-items-center">
          <a className="navbar-brand flex-shrink-0" href="home.html">
            <img src="assetsimg/logo.png" alt="Logo de la empresa" />
            AQUA-T
          </a>

          <ul className="navbar-nav flex-row ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="productos.html">Productos</a></li>
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a></li>
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="blogs.html">Blog</a></li>
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="contacto.html">Contacto</a></li>
            <li className="nav-item">
              <a className="icono-carrito" href="carrito.html">
                🛒 Carrito
                <span id="contadorCarrito" className="badge-carrito" style={{ display: 'none' }}>0</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

   
      <div className="subnav-categorias">
        <div className="container">
          <ul className="nav flex-nowrap">
            <li className="nav-item"><a className="nav-link" href="filtros.html">Filtros</a></li>
            <li className="nav-item"><a className="nav-link" href="bombas.html">Bombas</a></li>
            <li className="nav-item"><a className="nav-link" href="accesorios.html">Accesorios</a></li>
            <li className="nav-item"><a className="nav-link" href="piscinas.html">Piscinas</a></li>
            <li className="nav-item"><a className="nav-link" href="quimicos.html">Químicos</a></li>
            <li className="nav-item"><a className="nav-link" href="productos.html">Ver todos</a></li>
            <div className="nav flex-nowrap ms-auto d-flex">
              <li className="nav-item"><a className="nav-link" href="inicioSesion.html">Inicia sesión</a></li>
              <li className="nav-item"><a className="nav-link" href="registro.html">Regístrate</a></li>
            </div>
          </ul>
        </div>
      </div>

      
      <header className="hero-productos d-flex align-items-center justify-content-center text-center text-white">
        <div className="hero-overlay"></div>
        <div className="container position-relative py-5">
          <h1 className="display-5 fw-bold mb-3">AQUA-T</h1>
          <p className="lead mx-auto" style={{ maxWidth: '650px' }}>
            Filtros de piscina diseñados para mantener tu agua limpia y cristalina todo el año.
            Encuentra el modelo ideal según el tamaño de tu piscina y disfruta de un mantenimiento
            simple, eficiente y duradero.
          </p>
        </div>
      </header>

     
      <div className="container my-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: 'var(--azul-profundo)' }}>Nuestros Productos</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '550px' }}>
            Conoce nuestra línea de filtros, bombas y equipo de limpieza, disponibles en distintos tamaños
            para adaptarse a las necesidades de tu piscina.
          </p>
        </div>
      </div>

    
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

                  {prod.descuento && (
                    <span className="badge bg-danger mb-2">{prod.descuento}</span>
                  )}

                  <button 
                    className="btn btn-primary btn-agregar-carrito"
                    data-id={prod.id} 
                    data-nombre={prod.nombre}
                    data-precio={prod.precioNum} 
                    data-imagen={prod.imagen}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}

       
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 d-flex align-items-center justify-content-center">
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <a href="productos.html" className="btn btn-primary">Ver mas</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <section className="franja-mitad my-5">
        <div className="row g-0">
          <div className="col-12 col-md-6 mitad-azul d-flex align-items-center justify-content-center text-center text-white p-5">
            <div>
              <h3 className="fw-bold mb-3">Calidad que se nota</h3>
              <p className="mb-0" style={{ maxWidth: '400px' }}>
                Más de 10 años entregando soluciones de filtrado confiables para piscinas en todo el país.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center text-center p-5" style={{ backgroundColor: '#ffffff' }}>
            <div>
              <h3 className="fw-bold mb-3" style={{ color: 'var(--azul-profundo)' }}>¿Por qué elegirnos?</h3>
              <ul className="list-unstyled text-start mx-auto" style={{ maxWidth: '320px', color: 'var(--texto)' }}>
                <li className="mb-2">✅ Envío a todo Chile</li>
                <li className="mb-2">✅ Garantía de fábrica</li>
                <li className="mb-2">✅ Atención personalizada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      <section className="franja-mitad mb-5">
        <div className="row g-0">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-5" style={{ backgroundColor: '#ffffff' }}>
            <img src="assetsimg/images.jpg" alt="Descuento en productos seleccionados" style={{ maxWidth: '320px' }} />
          </div>
          <div className="col-12 col-md-6 mitad-azul d-flex align-items-center justify-content-center text-center text-white p-5">
            <div>
              <h3 className="fw-bold mb-3">DESCUENTO OMG!!!</h3>
              <p className="mb-4" style={{ maxWidth: '380px' }}>
                Hasta 70% de descuento en productos seleccionados. Aprovecha antes que se acaben.
              </p>
              <a href="productos.html" className="btn btn-aqua">Ver productos</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-4 bg-light">
        <p className="mb-0">© 2026 AQUA-T Derechos Reservados</p>
      </footer>
    </>
  );
}