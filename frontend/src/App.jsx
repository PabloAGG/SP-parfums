import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PerfumeDetail from './pages/PerfumeDetail';
import Busqueda from './pages/Busqueda';
import './App.css';

import Header from './pages/header';
import Footer from './pages/footer';

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

         
        </Routes>
      </div>

<Footer />
    </>
  )
}

export default App
