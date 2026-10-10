import Login from '../pages/Login';
import { montar, escribir, clic, boton, limpiarAlmacenamiento } from './utils';

describe('Vista Login', () => {
  let vista;
  beforeEach(limpiarAlmacenamiento);
  afterEach(() => vista.desmontar());

  it('rechaza una contraseña incorrecta y no inicia sesión', () => {
    vista= montar(<Login />);
    const c= vista.contenedor;

    escribir(c.querySelector('#emailUsuario'), 'ivan.rivera@duoc.cl');
    escribir(c.querySelector('#contrasena'), 'incorrecta1');
    clic(boton(c, 'Iniciar sesión'));

    expect(c.textContent).toContain('Correo o contraseña incorrectos');
    expect(sessionStorage.getItem('aquaT_sesion')).toBeNull();
  });
});