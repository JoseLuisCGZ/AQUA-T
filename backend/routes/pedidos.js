import { Router } from 'express'
import { pool } from '../db.js'

const r = Router()

r.get('/', async (_, res) => {

  const [rows] =
    await pool.query(
      `SELECT *
       FROM pedidos
       ORDER BY fecha DESC`
    )

  res.json(rows)
})

r.post('/', async (req, res) => {

  const {
    usuarioId,
    cliente = {},
    envio = {},
    productos = [],
    cupon = ''
  } = req.body

  if (
    !Array.isArray(productos) ||
    productos.length === 0
  ) {

    return res.status(400).json({
      error:
        'El pedido no contiene productos'
    })
  }

  const conn =
    await pool.getConnection()

  try {

    await conn.beginTransaction()

    let subtotal = 0

    const lineas = []

    for (
      const item of productos
    ) {

      const productoId =
        item.productoId ||
        item.id

      const cantidad =
        Number(item.cantidad)

      if (
        !productoId ||
        !Number.isInteger(cantidad) ||
        cantidad <= 0
      ) {

        throw new Error(
          'Producto o cantidad inválida'
        )
      }

      const [[producto]] =
        await conn.query(
          `SELECT
             precio,
             stock
           FROM productos
           WHERE id = ?
           FOR UPDATE`,
          [productoId]
        )

      if (!producto) {

        throw new Error(
          `Producto no encontrado: ${productoId}`
        )
      }

      if (
        producto.stock <
        cantidad
      ) {

        throw new Error(
          `Sin stock suficiente: ${productoId}`
        )
      }

      const precio =
        Number(producto.precio)

      subtotal +=
        precio * cantidad

      lineas.push({
        productoId,
        cantidad,
        precio
      })

      await conn.query(
        `UPDATE productos
         SET stock = stock - ?
         WHERE id = ?`,
        [
          cantidad,
          productoId
        ]
      )
    }

    const porcentaje =
      cupon === 'AQUA10'
        ? 0.10
        : cupon === 'VERANO20'
          ? 0.20
          : 0

    const descuento =
      Number(
        (
          subtotal *
          porcentaje
        ).toFixed(2)
      )

    const total =
      Number(
        (
          subtotal -
          descuento
        ).toFixed(2)
      )

    const [pedido] =
      await conn.query(
        `INSERT INTO pedidos (
          usuario_id,
          cliente_nombre,
          cliente_correo,
          cliente_telefono,
          envio_region,
          envio_comuna,
          envio_direccion,
          cupon,
          subtotal,
          descuento,
          total,
          estado
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )`,
        [
          usuarioId || null,
          cliente.nombre || null,
          cliente.correo || null,
          cliente.telefono || null,
          envio.region || null,
          envio.comuna || null,
          envio.direccion || null,
          cupon || null,
          subtotal,
          descuento,
          total,
          'Confirmado'
        ]
      )

    for (
      const linea of lineas
    ) {

      await conn.query(
        `INSERT INTO pedido_items (
          pedido_id,
          producto_id,
          cantidad,
          precio_unitario
        )
        VALUES (?, ?, ?, ?)`,
        [
          pedido.insertId,
          linea.productoId,
          linea.cantidad,
          linea.precio
        ]
      )
    }

    await conn.commit()

    res.status(201).json({
      id:
        pedido.insertId,

      subtotal,
      descuento,
      total
    })

  } catch (error) {

    await conn.rollback()

    res.status(400).json({
      error:
        error.message
    })

  } finally {

    conn.release()
  }
})

export default r