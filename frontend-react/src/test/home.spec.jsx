import Home from '../pages/Home';
import { obtenerCarrito } from '../services/carritoService';
import { montar, clic, limpiarAlmacenamiento } from './utils';

describe('Vista Home', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista.desmontar());

  it('guarda el producto en el carrito al presionar "Añadir al carrito"', () => {
    vista= montar(<Home />);
    expect(obtenerCarrito().length).toBe(0);

    clic(vista.contenedor.querySelector('.btn-agregar-carrito'));

    const carrito= obtenerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe('filtro-vulcano-20');
    expect(carrito[0].cantidad).toBe(1);
  });
});