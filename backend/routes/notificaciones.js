import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router()

const transporte = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

router.post('/inicio-sesion', async (req, res) => {
  const { correo, nombre } = req.body

  if (!correo) {
    return res.status(400).json({ error: 'Falta el correo' })
  }

  try {
    await transporte.sendMail({
      from: `"AQUA-T" <${process.env.MAIL_USER}>`,
      to: correo,
      subject: 'Inicio de sesión en AQUA-T',
      html: `
        <h2>Hola ${nombre || ''}</h2>
        <p>Se ha iniciado sesión en tu cuenta de AQUA-T.</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-CL')}</p>
        <p>Si no fuiste tú, cambia tu contraseña.</p>
      `
    })

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo enviar el correo' })
  }
})

export default router