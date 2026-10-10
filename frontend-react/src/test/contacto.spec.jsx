import Contacto from '../pages/Contacto';
import { montar, llenar, clic, boton } from './utils';

describe('Vista Contacto', () => {
  let vista;
  afterEach(() => vista.desmontar());

  it('confirma el envío y limpia el formulario cuando todo es válido', () => {
    vista= montar(<Contacto />);
    const c= vista.contenedor;

    llenar(c, {
      nombre: 'Julian Casablancas',
      email: 'casablancas@gmail.com',
      telefono: '912345678',
      ciudad: 'Santiago',
      mensaje: 'Necesito cotizar un filtro para mi piscina',
      noRobot: true,
    });
    clic(boton(c, 'Enviar Formulario'));

    expect(c.textContent).toContain('Muchas Gracias Ana Pérez Tu consulta fue enviada con exito.');
    expect(c.querySelector('[name="nombre"]').value).toBe('');
    expect(c.querySelector('[name="mensaje"]').value).toBe('');
    expect(c.querySelector('[name="noRobot"]').checked).toBeFalse();
  });
});