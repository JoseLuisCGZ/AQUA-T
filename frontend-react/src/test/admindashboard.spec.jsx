import AdminDashboard from '../pages/admin/AdminDashboard';
import { obtenerProductos } from '../services/productosService';
import { obtenerUsuarios } from '../services/usuariosService';
import { montar, limpiarAlmacenamiento, iniciarSesionComo } from './utils';

describe('Vista AdminDashboard', () => {
  let vista;
  beforeEach(() => {
    limpiarAlmacenamiento();
    iniciarSesionComo('Administrador', 'Iván');
  });
  afterEach(() => vista.desmontar());

  it('muestra la cantidad de productos y usuarios registrados', () => {
    vista = montar(<AdminDashboard />);
    const c = vista.contenedor;
    const numeros = Array.from(c.querySelectorAll('.admin-stat-numero')).map((n) => n.textContent);

    expect(c.textContent).toContain('Productos registrados');
    expect(c.textContent).toContain('Usuarios registrados');
    expect(numeros).toEqual([String(obtenerProductos().length), String(obtenerUsuarios().length)]);
  });
});