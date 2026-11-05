import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function BotonGoogle({ onExito, onError }) {
  return (
    <GoogleLogin
      onSuccess={respuesta => {
        const datos = jwtDecode(respuesta.credential)
        onExito({
          nombre: datos.name,
          correo: datos.email,
          foto: datos.picture,
          token: respuesta.credential
        })
      }}
      onError={() => onError?.('No se pudo iniciar sesión con Google')}
      text="continue_with"
      locale="es"
    />
  )
}

export default BotonGoogle