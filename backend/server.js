import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import productos from './routes/productos.js'
import usuarios from './routes/usuarios.js'
import pedidos from './routes/pedidos.js'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/productos', productos)
app.use('/api/usuarios', usuarios)
app.use('/api/pedidos', pedidos)

app.listen(process.env.PORT, () =>
  console.log(`API en http://localhost:${process.env.PORT}`))