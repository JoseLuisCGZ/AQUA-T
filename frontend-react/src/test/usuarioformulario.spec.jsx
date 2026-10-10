import { Routes, Route } from 'react-router-dom';
import UsuarioFormulario from '../pages/admin/UsuarioFormulario';
import AdminUsuarios from '../pages/admin/AdminUsuarios';
import { regionesComunas } from '../data/regiones';
import { obtenerUsuarios } from '../services/usuariosService';
import { montar, llenar, act, clic, boton, limpiarAlmacenamiento, iniciarSesionComo } from './utils';

describe('Vista UsuarioFormulario', () => {
  let vista;
  beforeEach(() => {
    limpiarAlmacenamiento();
    iniciarSesionComo('Administrador');
  });
  afterEach(() => {
    jasmine.clock().uninstall();
    vista.desmontar();
  });

  it('crea el usuario y vuelve al listado cuando los datos son válidos', () => {
    const total= obtenerUsuarios().length;
    vista= montar(
      <Routes>
        <Route path="/admin/usuarios/nuevo" element={<UsuarioFormulario />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      </Routes>,
      { ruta: '/admin/usuarios/nuevo' }
    );
    const c= vista.contenedor;

    llenar(c, {
      run: '123456785',
      nombre: 'Jorge',
      apellidos: 'Gonazáles Ríos',
      correo: 'gonazales.jorge@gmail.com',
      contrasena: 'clave123',
      tipoUsuario: 'Vendedor',
      region: '0',
      comuna: regionesComunas[0].comunas[0],
      direccion: 'Av. Corazones 742',
    });

    jasmine.clock().install();
    clic(boton(c, 'Guardar usuario'));
    expect(c.textContent).toContain('Usuario creado con éxito');
    act(() => jasmine.clock().tick(900));

    expect(obtenerUsuarios().length).toBe(total + 1);
    expect(c.querySelector('h1').textContent).toBe('Usuarios');
    expect(c.textContent).toContain('marta.lagos@gmail.com');
  });
});