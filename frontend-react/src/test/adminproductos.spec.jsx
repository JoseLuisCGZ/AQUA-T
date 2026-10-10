import AdminProductos from '../pages/admin/AdminProductos';
import { obtenerProductos } from '../services/productosService';
import { montar, clic, boton, limpiarAlmacenamiento, iniciarSesionComo } from './utils';

describe('Vista AdminProductos', () => {
  let vista;
  beforeEach(() => {
    limpiarAlmacenamiento();
    iniciarSesionComo('Administrador');
  });
  afterEach(() => vista.desmontar());

  it('elimina un producto cuando se confirma la acción', () => {
    const total= obtenerProductos().length;
    vista= montar(<AdminProductos />);
    const c= vista.contenedor;
    expect(c.querySelectorAll('tbody tr').length).toBe(total);

    spyOn(window, 'confirm').and.returnValue(true);
    clic(boton(c, 'Eliminar'));

    expect(window.confirm).toHaveBeenCalled();
    expect(c.querySelectorAll('tbody tr').length).toBe(total - 1);
    expect(obtenerProductos().length).toBe(total - 1);
  });
});