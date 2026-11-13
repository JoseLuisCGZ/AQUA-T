import express from 'express'
import { enviarCorreo, esc } from '../mailer.js'

const router = express.Router()

router.post('/inicio-sesion', async (req, res) => {
  const { correo, nombre } = req.body

  if (!correo) {
    return res.status(400).json({ error: 'Falta el correo' })
  }

  try {
    await enviarCorreo({
      para: correo,
      nombre,
      asunto: 'Inicio de sesión en AQUA-T',
      html: `
        <h2>Hola ${esc(nombre)}</h2>
        <p>Se ha iniciado sesión en tu cuenta de AQUA-T.</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</p>
        <p>Si no fuiste tú, cambia tu contraseña.</p>`
    })

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo enviar el correo' })
  }
})

export default router