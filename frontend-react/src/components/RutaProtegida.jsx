import { Navigate } from 'react-router-dom'

import {
  obtenerSesion
} from '../services/sesionService'

function RutaProtegida({
  children,
  rolesPermitidos
}) {

  const sesion = obtenerSesion()

  if (!sesion) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  if (
    rolesPermitidos &&
    !rolesPermitidos.includes(
      sesion.tipoUsuario
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return children
}

export default RutaProtegida