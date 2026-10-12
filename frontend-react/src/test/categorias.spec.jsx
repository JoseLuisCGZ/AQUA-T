import Categorias from '../pages/Categorias';
import { categoriasProducto, obtenerProductos } from '../services/productosService';
import { montar, limpiarAlmacenamiento } from './utils';

describe('Vista Categorias', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista?.desmontar());

  it('muestra todas las categorías y solo los productos de la elegida', () => {
    const bombas = obtenerProductos().filter((p) => p.categoria=== 'Bombas');
    const filtro = obtenerProductos().find((p) => p.categoria=== 'Filtros');

    vista = montar(<Categorias />, {
      ruta: '/categorias/Bombas',
      patron: '/categorias/:nombre'
    });
    const c = vista.contenedor;

    expect(c.querySelectorAll('.categoria-tile').length).toBe(categoriasProducto.length);
    expect(c.querySelector('section h3').textContent).toBe('Bombas');
    expect(c.querySelectorAll('section .card').length).toBe(bombas.length);
    expect(c.querySelector('section').textContent).not.toContain(filtro.nombre);
  });
});