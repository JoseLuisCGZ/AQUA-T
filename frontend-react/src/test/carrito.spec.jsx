import Carrito from '../pages/Carrito';
import { montar, escribir, clic, boton, limpiarAlmacenamiento, cargarCarrito, PRODUCTO_EJEMPLO } from './utils';

describe('Vista Carrito', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista.desmontar());

  it('aplica el cupón AQUA10 con un 10% de descuento', () => {
    cargarCarrito([PRODUCTO_EJEMPLO]);
    vista= montar(<Carrito />);
    const c= vista.contenedor;

    escribir(c.querySelector('input[placeholder="Ingresa el cupón de descuento"]'), 'AQUA10');
    clic(boton(c, 'Aplicar'));

    expect(c.textContent).toContain('Cupón aplicado: 10% de descuento.');
    expect(c.textContent).toContain('-$12.000');
    expect(c.textContent).toContain('$108.000');
  });
});