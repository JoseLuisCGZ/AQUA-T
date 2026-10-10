import AdminUsuarios from '../pages/admin/AdminUsuarios';
import { obtenerUsuarios } from '../services/usuariosService';
import { montar, clic, boton, limpiarAlmacenamiento, iniciarSesionComo } from './utils';

describe('Vista AdminUsuarios', () => {
  let vista;
  beforeEach(() => {
    limpiarAlmacenamiento();
    iniciarSesionComo('Administrador');
  });
  afterEach(() => vista.desmontar());

  it('elimina un usuario cuando se confirma la acción', () => {
    const total= obtenerUsuarios().length;
    vista= montar(<AdminUsuarios />);
    const c= vista.contenedor;
    expect(c.querySelectorAll('tbody tr').length).toBe(total);

    spyOn(window, 'confirm').and.returnValue(true);
    clic(boton(c, 'Eliminar'));

    expect(window.confirm).toHaveBeenCalled();
    expect(c.querySelectorAll('tbody tr').length).toBe(total - 1);
    expect(obtenerUsuarios().length).toBe(total - 1);
  });
});