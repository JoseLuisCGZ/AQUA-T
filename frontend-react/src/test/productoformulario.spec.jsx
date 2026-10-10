import { Routes, Route } from 'react-router-dom';
import ProductoFormulario from '../pages/admin/ProductoFormulario';
import AdminProductos from '../pages/admin/AdminProductos';
import { obtenerProductos } from '../services/productosService';
import { montar, llenar, act, clic, boton, limpiarAlmacenamiento, iniciarSesionComo } from './utils';

describe('Vista ProductoFormulario', () => {
  let vista;
  beforeEach(() => {
    limpiarAlmacenamiento();
    iniciarSesionComo('Administrador');
  });
  afterEach(() => {
    jasmine.clock().uninstall();
    vista.desmontar();
  });

  it('crea el producto y vuelve al listado cuando los datos son válidos', () => {
    const total = obtenerProductos().length;
    vista = montar(
      <Routes>
        <Route path="/admin/productos/nuevo" element={<ProductoFormulario />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
      </Routes>,
      { ruta: '/admin/productos/nuevo' }
    );
    const c = vista.contenedor;

    llenar(c, {
      codigo: 'BOM-TEST',
      nombre: 'Bomba de prueba',
      precio: '25000',
      stock: '10',
      stockCritico: '2',
      categoria: 'Bombas',
    });

    jasmine.clock().install();
    clic(boton(c, 'Guardar producto'));
    expect(c.textContent).toContain('Producto creado con éxito');
    act(() => jasmine.clock().tick(900));

    expect(obtenerProductos().length).toBe(total + 1);
    expect(c.querySelector('h1').textContent).toBe('Productos');
    expect(c.textContent).toContain('Bomba de prueba');
  });
});