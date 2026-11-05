import CompraExitosa from '../pages/CompraExitosa';
import { montar } from './utils';

describe('Vista CompraExitosa', () => {
  let vista;
  afterEach(() => vista.desmontar());

  it('confirma la compra e indica el número de pedido', () => {
    vista= montar(<CompraExitosa />, { ruta: { pathname: '/compra-exitosa', state: { pedidoId: 7 } } });
    const c= vista.contenedor;

    expect(c.querySelector('h1').textContent).toContain('Compra realizada con éxito');
    expect(c.textContent).toContain('Número de pedido:');
    expect(c.querySelector('strong').textContent).toBe('#7');
  });
});