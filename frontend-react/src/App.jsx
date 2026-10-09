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
        path="/contacto"
        element={<Contacto />}
        />


      </Routes>

    </Router>
  )
}

export default App