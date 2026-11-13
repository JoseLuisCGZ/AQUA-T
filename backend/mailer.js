export const esc = texto =>
  String(texto ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))

export async function enviarCorreo({ para, nombre, asunto, html }) {
  const respuesta = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      sender: { name: 'AQUA-T', email: process.env.MAIL_FROM },
      to: [{ email: para, name: nombre || undefined }],
      subject: asunto,
      htmlContent: html
    })
  })

  if (!respuesta.ok) {
    throw new Error(`Brevo ${respuesta.status}: ${await respuesta.text()}`)
  }
}