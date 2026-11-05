import BlogDetalle from '../pages/BlogDetalle';
import { montar } from './utils';

describe('Vista BlogDetalle', () => {
  let vista;
  afterEach(() => vista.desmontar());

  it('muestra un mensaje cuando el artículo no existe', () => {
    vista = montar(<BlogDetalle />,{ ruta: '/blogs/no-existe', patron: '/blogs/:slug' });

    expect(vista.contenedor.querySelector('h1').textContent).toBe('Artículo no encontrado');
    expect(vista.contenedor.querySelector('a[href="/blogs"]')).not.toBeNull();
  });
});