import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Asegúrate de tener este archivo CSS
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
const [searchbarVisible, setSearchbarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  const toggleSearchbar = () => {
    setSearchbarVisible(!searchbarVisible);
  }

const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Redirige a la página de búsqueda con query param
      navigate(`/busqueda/${encodeURIComponent(searchTerm)}`);
      
      toggleSearchbar(); // Cierra la barra de búsqueda
    }
  };
  return (
    <header className="header">
      
      <button
        className={`hamburger ${menuAbierto ? 'activo' : ''}`}
        onClick={toggleMenu}
        aria-label="Menú de navegación"
        aria-expanded={menuAbierto}
        title="Menú"
      >
        <span />
        <span />
        <span />
      </button>


      <nav className={`nav-links ${menuAbierto ? 'activo' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/categorias" className="nav-link" onClick={() => setMenuAbierto(false)}>Categorías</Link>
        <Link to="/pedidos" className="nav-link" onClick={() => setMenuAbierto(false)}>Mis pedidos</Link>
      </nav>
      
      
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/IMG/LogoPrin.png" alt="Logo de la empresa" className="logo" />
        </Link>
      </div>

<div className="user-menu">
        {/* <Link to="/" className="user-link">
          <i className="fas fa-user"></i>
        </Link>
        <Link to="/" className="user-link">
          <i className="fas fa-shopping-cart"></i>  
        </Link> */}
        <div className={`search-container ${searchbarVisible ? 'active' : ''}`}>
        <input
          type="text"
          className="search-bar "
          placeholder="Buscar perfumes..."
          aria-label="Buscar perfumes"
          onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        />
        <button className="search-button" aria-label="Buscar" onClick={toggleSearchbar} title='Buscar perfumes'>
          <i className="fas fa-search"></i>
        </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
