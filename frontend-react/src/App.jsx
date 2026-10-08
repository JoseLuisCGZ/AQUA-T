// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio (http://localhost:5173/) */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para la página de productos (http://localhost:5173/productos) */}
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;

