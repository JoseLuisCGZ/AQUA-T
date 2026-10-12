import { Router } from 'express'
import { pool } from '../db.js'
const r = Router()

r.get('/', async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM pedidos ORDER BY fecha DESC')
  res.json(rows)
})

r.post('/', async (req, res) => {
  const { usuarioId, items } = req.body   // items: [{ productoId, cantidad }]
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    let total = 0
    const lineas = []
    for (const it of items) {
      const [[p]] = await conn.query(
        'SELECT precio, stock FROM productos WHERE id=? FOR UPDATE', [it.productoId])
      if (!p || p.stock < it.cantidad) throw new Error(`Sin stock: ${it.productoId}`)
      total += p.precio * it.cantidad
      lineas.push([it.productoId, it.cantidad, p.precio])
      await conn.query('UPDATE productos SET stock=stock-? WHERE id=?', [it.cantidad, it.productoId])
    }
    const [ped] = await conn.query(
      'INSERT INTO pedidos (usuario_id,total) VALUES (?,?)', [usuarioId ?? null, total])
    for (const l of lineas)
      await conn.query(
        'INSERT INTO pedido_items (pedido_id,producto_id,cantidad,precio_unitario) VALUES (?,?,?,?)',
        [ped.insertId, ...l])
    await conn.commit()
    res.status(201).json({ id: ped.insertId, total })
  } catch (e) {
    await conn.rollback()
    res.status(400).json({ error: e.message })
  } finally { conn.release() }
})

export default r