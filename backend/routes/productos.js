import { Router } from 'express'
import { pool } from '../db.js'
const r = Router()

const SELECT = `SELECT p.id, p.codigo, p.nombre, p.descripcion, p.precio,
  p.precio_anterior AS precioAnterior, p.descuento, p.stock,
  p.stock_critico AS stockCritico, p.imagen, c.nombre AS categoria
  FROM productos p JOIN categorias c ON c.id = p.categoria_id`

r.get('/', async (_, res) => {
  const [rows] = await pool.query(SELECT)
  res.json(rows)
})

r.get('/:id', async (req, res) => {
  const [rows] = await pool.query(`${SELECT} WHERE p.id = ?`, [req.params.id])
  rows[0] ? res.json(rows[0]) : res.sendStatus(404)
})

r.post('/', async (req, res) => {
  const p = req.body
  const [[cat]] = await pool.query('SELECT id FROM categorias WHERE nombre=?', [p.categoria])
  const id = p.id || p.nombre.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 60)
  await pool.query(
    `INSERT INTO productos (id,codigo,nombre,descripcion,precio,precio_anterior,
     descuento,stock,stock_critico,categoria_id,imagen) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [id, p.codigo, p.nombre, p.descripcion ?? '', p.precio, p.precioAnterior ?? null,
     p.descuento ?? null, p.stock ?? 20, p.stockCritico ?? 5, cat.id, p.imagen ?? null])
  res.status(201).json({ id })
})

r.put('/:id', async (req, res) => {
  const p = req.body
  const [[cat]] = await pool.query('SELECT id FROM categorias WHERE nombre=?', [p.categoria])
  const [out] = await pool.query(
    `UPDATE productos SET codigo=?, nombre=?, descripcion=?, precio=?, precio_anterior=?,
     descuento=?, stock=?, stock_critico=?, categoria_id=?, imagen=? WHERE id=?`,
    [p.codigo, p.nombre, p.descripcion ?? '', p.precio, p.precioAnterior ?? null,
     p.descuento ?? null, p.stock, p.stockCritico, cat.id, p.imagen ?? null, req.params.id])
  out.affectedRows ? res.sendStatus(204) : res.sendStatus(404)
})

r.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM productos WHERE id=?', [req.params.id])
  res.sendStatus(204)
})

export default r