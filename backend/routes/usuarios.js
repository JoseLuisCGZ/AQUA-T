import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'

const r = Router()

const COLS = `
  id,
  run,
  nombre,
  apellidos,
  correo,
  telefono,
  fecha_nacimiento AS fechaNacimiento,
  tipo_usuario AS tipoUsuario,
  region,
  comuna,
  direccion
`

r.get('/', async (_, res) => {

  const [rows] =
    await pool.query(
      `SELECT ${COLS} FROM usuarios`
    )

  res.json(rows)
})

r.get('/:id', async (req, res) => {

  const [rows] =
    await pool.query(
      `SELECT ${COLS}
       FROM usuarios
       WHERE id = ?`,
      [req.params.id]
    )

  if (!rows[0]) {
    return res.sendStatus(404)
  }

  res.json(rows[0])
})

r.post('/login', async (req, res) => {

  const {
    correo,
    contrasena
  } = req.body

  const [rows] =
    await pool.query(
      `SELECT *
       FROM usuarios
       WHERE correo = ?`,
      [correo.trim()]
    )

  const usuario = rows[0]

  if (
    !usuario ||
    !(await bcrypt.compare(
      contrasena,
      usuario.contrasena_hash
    ))
  ) {

    return res.status(401).json({
      error:
        'Credenciales inválidas'
    })
  }

  res.json({
    id:
      usuario.id,

    run:
      usuario.run,

    nombre:
      usuario.nombre,

    apellidos:
      usuario.apellidos,

    correo:
      usuario.correo,

    telefono:
      usuario.telefono,

    fechaNacimiento:
      usuario.fecha_nacimiento,

    tipoUsuario:
      usuario.tipo_usuario,

    region:
      usuario.region,

    comuna:
      usuario.comuna,

    direccion:
      usuario.direccion
  })
})

r.post('/', async (req, res) => {

  const u = req.body

  const hash =
    await bcrypt.hash(
      u.contrasena,
      10
    )

  try {

    const [out] =
      await pool.query(
        `INSERT INTO usuarios (
          run,
          nombre,
          apellidos,
          correo,
          contrasena_hash,
          telefono,
          fecha_nacimiento,
          tipo_usuario,
          region,
          comuna,
          direccion
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          u.run,
          u.nombre,
          u.apellidos,
          u.correo,
          hash,
          u.telefono || null,
          u.fechaNacimiento || null,
          u.tipoUsuario || 'Cliente',
          u.region,
          u.comuna,
          u.direccion
        ]
      )

    res.status(201).json({
      id: out.insertId
    })

  } catch (error) {

    if (
      error.code ===
      'ER_DUP_ENTRY'
    ) {

      return res.status(409).json({
        error:
          'RUN o correo ya existe'
      })
    }

    throw error
  }
})

r.put('/:id', async (req, res) => {

  const u = req.body

  try {

    const [out] =
      await pool.query(
        `UPDATE usuarios
         SET
           run = ?,
           nombre = ?,
           apellidos = ?,
           correo = ?,
           telefono = ?,
           fecha_nacimiento = ?,
           tipo_usuario = ?,
           region = ?,
           comuna = ?,
           direccion = ?
         WHERE id = ?`,
        [
          u.run,
          u.nombre,
          u.apellidos,
          u.correo,
          u.telefono || null,
          u.fechaNacimiento || null,
          u.tipoUsuario,
          u.region,
          u.comuna,
          u.direccion,
          req.params.id
        ]
      )

    if (
      out.affectedRows === 0
    ) {
      return res.sendStatus(404)
    }

    if (u.contrasena) {

      const hash =
        await bcrypt.hash(
          u.contrasena,
          10
        )

      await pool.query(
        `UPDATE usuarios
         SET contrasena_hash = ?
         WHERE id = ?`,
        [
          hash,
          req.params.id
        ]
      )
    }

    res.sendStatus(204)

  } catch (error) {

    if (
      error.code ===
      'ER_DUP_ENTRY'
    ) {

      return res.status(409).json({
        error:
          'RUN o correo ya existe'
      })
    }

    throw error
  }
})

r.delete('/:id', async (req, res) => {

  const [out] =
    await pool.query(
      `DELETE FROM usuarios
       WHERE id = ?`,
      [req.params.id]
    )

  if (
    out.affectedRows === 0
  ) {
    return res.sendStatus(404)
  }

  res.sendStatus(204)
})

export default r