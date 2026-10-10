import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
const r = Router()

const COLS = `id, run, nombre, apellidos, correo, telefono,
  fecha_nacimiento AS fechaNacimiento, tipo_usuario AS tipoUsuario,
  region, comuna, direccion`

r.get('/', async (_, res) => {
  const [rows] = await pool.query(`SELECT ${COLS} FROM usuarios`)
  res.json(rows)
})

r.get('/:id', async (req, res) => {
  const [rows] = await pool.query(`SELECT ${COLS} FROM usuarios WHERE id=?`, [req.params.id])
  rows[0] ? res.json(rows[0]) : res.sendStatus(404)
})

r.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo=?', [correo.trim()])
  const u = rows[0]
  if (!u || !(await bcrypt.compare(contrasena, u.contrasena_hash)))
    return res.status(401).json({ error: 'Credenciales inválidas' })
  const { contrasena_hash, ...seguro } = u
  res.json(seguro)
})

r.post('/', async (req, res) => {
  const u = req.body
  const hash = await bcrypt.hash(u.contrasena, 10)
  try {
    const [out] = await pool.query(
      `INSERT INTO usuarios (run,nombre,apellidos,correo,contrasena_hash,telefono,
       fecha_nacimiento,tipo_usuario,region,comuna,direccion) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [u.run, u.nombre, u.apellidos, u.correo, hash, u.telefono || null,
       u.fechaNacimiento || null, u.tipoUsuario || 'Cliente', u.region, u.comuna, u.direccion])
    res.status(201).json({ id: out.insertId })
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'RUN o correo ya existe' })
    throw e
  }
})

r.put('/:id', async (req, res) => {
  const u = req.body
  await pool.query(
    `UPDATE usuarios SET nombre=?, apellidos=?, correo=?, telefono=?, fecha_nacimiento=?,
     tipo_usuario=?, region=?, comuna=?, direccion=? WHERE id=?`,
    [u.nombre, u.apellidos, u.correo, u.telefono || null, u.fechaNacimiento || null,
     u.tipoUsuario, u.region, u.comuna, u.direccion, req.params.id])
  if (u.contrasena)
    await pool.query('UPDATE usuarios SET contrasena_hash=? WHERE id=?',
      [await bcrypt.hash(u.contrasena, 10), req.params.id])
  res.sendStatus(204)
})

r.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM usuarios WHERE id=?', [req.params.id])
  res.sendStatus(204)
})

export default r