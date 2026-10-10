import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

export { act };

export function montar(vista, { ruta= '/', patron = null }= {}) {
  const contenedor= document.createElement('div');
  document.body.appendChild(contenedor);
  const root= createRoot(contenedor);

  const contenido= patron
    ? <Routes><Route path={patron} element={vista} /></Routes>
    : vista;

  act(() => root.render(<MemoryRouter initialEntries={[ruta]}>{contenido}</MemoryRouter>));

  return {
    contenedor,
    desmontar() {
      act(() => root.unmount());
      contenedor.remove();
    },
  };
}

export function escribir(campo, valor) {
  const prototipo=
    campo instanceof HTMLSelectElement ? HTMLSelectElement.prototype
    : campo instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const asignar= Object.getOwnPropertyDescriptor(prototipo, 'value').set;
  act(() => {
    asignar.call(campo, valor);
    campo.dispatchEvent(new Event(campo instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
  });
}

export function llenar(contenedor, datos) {
  Object.entries(datos).forEach(([nombre, valor]) => {
    const campo= contenedor.querySelector(`[name="${nombre}"]`);
    if (campo.type=== 'checkbox') {
      if (campo.checked!== valor) act(() => campo.click());
    } else {
      escribir(campo, valor);
    }
  });
}

export function clic(elemento) {
  act(() => elemento.click());
}

export function boton(contenedor, texto) {
  return Array.from(contenedor.querySelectorAll('button')).find((b) => b.textContent.trim() === texto);
}

export function limpiarAlmacenamiento() {
  localStorage.clear();
  sessionStorage.clear();
}

export function iniciarSesionComo(tipoUsuario, nombre = 'Tester') {
  sessionStorage.setItem('aquaT_sesion', JSON.stringify({ id: 1, correo: 'test@duoc.cl', nombre, tipoUsuario }));
}

export function cargarCarrito(items) {
  localStorage.setItem('aquaCarrito', JSON.stringify(items));
}

export const PRODUCTO_EJEMPLO= {
  id: 'filtro-vulcano-20',
  nombre: 'Filtro VC VULCANO 20',
  precio: 120000,
  imagen: '/assetsimg/filtro1.jpg',
  cantidad: 1,
};