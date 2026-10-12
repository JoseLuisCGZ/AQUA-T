import Ofertas from '../pages/Ofertas';
import { obtenerProductos } from '../services/productosService';
import { montar, limpiarAlmacenamiento } from './utils';

describe('Vista Ofertas', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista?.desmontar());

  it('muestra solo los productos que están en oferta', () => {
    const enOferta = obtenerProductos().filter((p) => p.precioAnterior);
    const sinOferta = obtenerProductos().find((p) => !p.precioAnterior);
    expect(enOferta.length).toBeGreaterThan(0);

    vista = montar(<Ofertas />, { ruta: '/ofertas' });
    const c = vista.contenedor;

    expect(c.querySelector('h2').textContent).toBe('Ofertas');
    expect(c.querySelectorAll('.card').length).toBe(enOferta.length);
    enOferta.forEach((p) => expect(c.textContent).toContain(p.nombre));
    expect(c.textContent).not.toContain(sinOferta.nombre);
  });
});
