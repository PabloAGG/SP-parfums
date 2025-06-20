import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PerfumeDetail from './pages/PerfumeDetail';
import Busqueda from './pages/Busqueda';
import './App.css';
import Catalogo from './pages/Catalogo';
import Header from './pages/header';
import Footer from './pages/footer';
import PedidosTemporales from './pages/pedidos';

function App() {
 
  return (
    <>
      {/* Aquí ira un Navbar que se vera en todas las páginas */}
        <Header />
 
        {/* Aquí ira el contenido principal de la aplicación */}
      <div className="main-content">
        <Routes>
          {/* Ruta para el Dashboard (página principal) */}
          <Route path="/" element={<Dashboard />} />
           <Route path="/busqueda/:q" element={<Busqueda />} />
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
           <Route path="/catalogo" element={<Catalogo />} /> 
           <Route path="/pedidos" element={<PedidosTemporales />} />
         
        </Routes>
      </div>

<Footer />
    </>
  )
}

export default App
