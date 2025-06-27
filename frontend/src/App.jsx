import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react'; 
import './App.css';
import Header from './pages/header';
import Footer from './pages/footer';
import Loading from './componentes/loading';

//imports dinamicos para lazy loading de componentes
const Dashboard = lazy(()=> import('./pages/Dashboard'));
const PerfumeDetail = lazy(()=>import('./pages/PerfumeDetail'));
const Busqueda = lazy(()=>import ('./pages/Busqueda') );
const Catalogo =lazy(()=> import ('./pages/Catalogo'));
const PedidosTemporales = lazy(()=> import ('./pages/pedidos'));
const Login = lazy(()=> import ('./pages/Login'));
const Registro = lazy(()=>import ('./pages/Registro'));
const Perfil = lazy(()=>import ('./pages/Perfil'));
function App() {
 
  return (
    <>
      {/* Aquí ira un Navbar que se vera en todas las páginas */}
        <Header />
 
        {/* Aquí ira el contenido principal de la aplicación */}
      <div className="main-content">
        <Suspense fallback={<Loading/>}>
          {/* Rutas de la aplicación */}
          {/* Suspense se usa para mostrar un loading mientras se cargan los componentes */}
        <Routes>
    
          <Route path="/" element={<Dashboard />} />
           <Route path="/busqueda/:q" element={<Busqueda />} />
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
           <Route path="/catalogo" element={<Catalogo />} /> 
           <Route path="/pedidos" element={<PedidosTemporales />} />
           <Route path='/login' element={<Login/>} />
          <Route path='/registro' element={<Registro/>} />
         <Route path='/perfil' element={<Perfil/>} />
        </Routes>
        </Suspense>
      </div>

<Footer />
    </>
  )
}

export default App
