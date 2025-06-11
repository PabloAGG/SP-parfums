import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Asegúrate de tener este archivo CSS

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/IMG/logo.png" alt="Logo de la empresa" className="logo" />
        </Link>
      </div>

      <button
        className={`hamburger ${menuAbierto ? 'activo' : ''}`}
        onClick={toggleMenu}
        aria-label="Menú de navegación"
        aria-expanded={menuAbierto}
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
    </header>
  );
};

export default Header;
