import Nosotros from '../pages/Nosotros';
import { montar } from './utils';

describe('Vista Nosotros', () => {
  let vista;
  afterEach(() => vista.desmontar());

  it('muestra la información de la empresa', () => {
    vista= montar(<Nosotros />);
    const c = vista.contenedor;

    expect(c.querySelector('#nosotros h2').textContent).toBe('Nosotros');
    expect(c.textContent).toContain('Quiénes Somos');
    expect(c.textContent).toContain('En AQUA-T nos dedicamos');
    expect(c.querySelector('img[alt="Logo AQUA-T"]')).not.toBeNull();
  });
});