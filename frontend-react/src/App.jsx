import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'
import BlogDetalle from './pages/BlogDetalle'
import Contacto from './pages/Contacto'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraFallida from './pages/CompraFallida'
import AdminDashboard from './pages/admin/AdminDashboard'
import RutaProtegida from './components/RutaProtegida'

function App() {
  return (
    <Router>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/nosotros"
          element={<Nosotros />}
        />

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/blogs/:slug"
          element={<BlogDetalle />}
        />

        <Route
        path="/registro"
        element={<Registro />}
        />

        <Route
        path="/contacto"
        element={<Contacto />}
        />

        <Route
        path="/login"
        element={<Login />}
        />

        <Route
        path="/carrito"
        element={<Carrito />}
        />

        <Route
        path="/checkout"
        element={<Checkout />}
        />

        <Route
        path="/compra-exitosa"
        element={<CompraExitosa />}
        />

        <Route
        path="/compra-fallida"
        element={<CompraFallida />}
        />

        <Route
        path="/admin"
        element={
        <RutaProtegida
        rolesPermitidos={[
        'Administrador',
        'Vendedor'
        ]}
        >
          <AdminDashboard />
        </RutaProtegida>
        }
        />



      </Routes>

    </Router>
  )
}

export default App