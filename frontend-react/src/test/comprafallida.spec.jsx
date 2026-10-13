import { Routes, Route } from 'react-router-dom';
import CompraFallida from '../pages/CompraFallida';
import Checkout from '../pages/Checkout';
import { montar, clic, limpiarAlmacenamiento, cargarCarrito, PRODUCTO_EJEMPLO } from './utils';

describe('Vista CompraFallida', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista.desmontar());

  it('permite intentar nuevamente yendo al checkout', () => {
    cargarCarrito([PRODUCTO_EJEMPLO]);
    vista = montar(
      <Routes>
        <Route path="/compra-fallida" element={<CompraFallida />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>,
      { ruta: '/compra-fallida' }
    );
    const c= vista.contenedor;
    expect(c.querySelector('h1').textContent).toBe('No se pudo completar la compra');

    clic(c.querySelector('.contacto-card a[href="/checkout"]'));

    expect(c.textContent).toContain('Finalizar compra');
    expect(c.textContent).not.toContain('No se pudo completar la compra');
  });
});