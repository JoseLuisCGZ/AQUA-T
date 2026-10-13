import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import { productos } from '../../frontend-react/src/data/productos.js'

for (const [i, p] of productos.entries()) {
  const [[cat]] = await pool.query('SELECT id FROM categorias WHERE nombre=?', [p.categoria])
  await pool.query(
    `INSERT INTO productos (id,codigo,nombre,descripcion,precio,precio_anterior,descuento,categoria_id,imagen)
     VALUES (?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), precio=VALUES(precio)`,
    [p.id, `AQT-${String(i + 1).padStart(3, '0')}`, p.nombre, p.descripcion,
     p.precio, p.precioAnterior ?? null, p.descuento ?? null, cat.id, p.imagen])
}

const usuarios = [
  ['211567899','Iván','Rivera','ivan.rivera@duoc.cl','2002-10-25','Administrador','Región Metropolitana de Santiago','Santiago','Lomas Ticas 123'],
  ['128493456','Jose','Cornejo','jose.cornejo@gmail.com','1998-11-02','Vendedor','Región Metropolitana de Santiago','Puente Alto','Puente Asalto 456'],
  ['205671234','Jose','Cisternas','jose.cisternas@gmail.com','2000-02-20','Cliente','Región del Biobío','Concepción','Lomas turbas 789']
]
const hash = await bcrypt.hash('123456', 10)
for (const u of usuarios)
  await pool.query(
    `INSERT IGNORE INTO usuarios (run,nombre,apellidos,correo,contrasena_hash,fecha_nacimiento,
     tipo_usuario,region,comuna,direccion) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [u[0], u[1], u[2], u[3], hash, ...u.slice(4)])

console.log('Seed listo'); process.exit()