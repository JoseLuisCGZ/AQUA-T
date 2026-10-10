import Productos from '../pages/Productos';
import { obtenerProductos } from '../services/productosService';
import { montar, limpiarAlmacenamiento } from './utils';

describe('Vista Productos', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista.desmontar());

  it('filtra los productos cuando la URL trae ?categoria=', () => {
    const bombas= obtenerProductos().filter((p) => p.categoria=== 'Bombas');

    vista= montar(<Productos />,{ ruta: '/productos?categoria=Bombas' });
    const c= vista.contenedor;

    expect(c.querySelectorAll('.card').length).toBe(bombas.length);
    expect(c.textContent).toContain('Nuestros productos: Bombas');
    expect(c.textContent).not.toContain('Filtro VC VULCANO');
  });
});