import { Routes, Route } from 'react-router-dom';
import Checkout from '../pages/Checkout';
import CompraExitosa from '../pages/CompraExitosa';
import { regionesComunas } from '../data/regiones';
import { obtenerCarrito } from '../services/carritoService';
import { obtenerPedidos } from '../services/pedidosService';
import { montar, llenar, clic, boton, limpiarAlmacenamiento, cargarCarrito, PRODUCTO_EJEMPLO } from './utils';

describe('Vista Checkout', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista.desmontar());

  it('crea el pedido, vacía el carrito y lleva a la compra exitosa', () => {
    cargarCarrito([PRODUCTO_EJEMPLO]);
    vista= montar(
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
      </Routes>,
      { ruta: '/checkout' }
    );
    const c= vista.contenedor;

    llenar(c, {
      nombre: 'Paul Banks',
      correo: 'banks@gmail.com',
      region: '0',
      comuna: regionesComunas[0].comunas[0],
      direccion: 'Calle El Pintor 123',
    });
    clic(boton(c, 'Confirmar compra'));

    expect(obtenerPedidos().length).toBe(1);
    expect(obtenerCarrito().length).toBe(0);
    expect(c.querySelector('h1').textContent).toContain('Compra realizada con éxito');
    expect(c.textContent).toContain('#1');
  });
});