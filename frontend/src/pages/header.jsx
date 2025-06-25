import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Asegúrate de tener este archivo CSS
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api'; // Importa la URL de la API
const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
const [searchbarVisible, setSearchbarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    if (!menuAbierto) {
      setSearchbarVisible(false); // Cierra la barra de búsqueda al abrir el menú
    setSearchTerm(''); // Limpia el campo de búsqueda
    }
  };
  const toggleSearchbar = () => {
    setSearchbarVisible(!searchbarVisible);
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

fetch(`${API_URL}/api/busqueda?q=${encodeURIComponent(value)}`)
          .then(res => {
      if (!res.ok) throw new Error('Error de red o servidor');
      return res.json();
    })
      .then(data => {
      // Filtra los perfumes por nombre (ajusta según tu estructura de datos)
      const filtered = data.filter(perfume =>
        perfume.nombre.toLowerCase().includes(value.toLowerCase()) ||
        perfume.marcap.toLowerCase().includes(value.toLowerCase()) // También filtra por marca
      );
      setSuggestions(filtered.slice(0, 5)); // Máximo 5 sugerencias
    })
      .catch(err => {
        console.error("Error al buscar sugerencias:", err);
        setSuggestions([]); // Limpia las sugerencias en caso de error
      }
      );
  };

  const handleSuggestionClick = (nombre) => {
    setSearchTerm(nombre);
    setSuggestions([]);
    // Opcional: navegar directamente a la página del perfume
     navigate(`/busqueda/${encodeURIComponent(nombre)}`);
    toggleSearchbar(); // Cierra la barra de búsqueda
    setMenuAbierto(false); // Cierra el menú si está abierto
    setSearchTerm(''); // Limpia el campo de búsqueda

  };



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Redirige a la página de búsqueda con query param
      navigate(`/busqueda/${encodeURIComponent(searchTerm)}`);
      
      setSuggestions([]); // Limpia las sugerencias
      toggleSearchbar(); // Cierra la barra de búsqueda
     
      setMenuAbierto(false); // Cierra el menú si está abierto
       setSearchTerm(''); // Limpia el campo de búsqueda
    }
  };

const suggestionsTimeout = useRef(null);


  useEffect(() => {
    // Si hay sugerencias, inicia el temporizador
    if (suggestions.length > 0) {
      if (suggestionsTimeout.current) clearTimeout(suggestionsTimeout.current);
      suggestionsTimeout.current = setTimeout(() => {
        setSuggestions([]);
      }, 2000); // 2 segundos
    }
    // Limpia el timeout si el componente se desmonta o suggestions cambia
    return () => {
      if (suggestionsTimeout.current) clearTimeout(suggestionsTimeout.current);
    };
  }, [suggestions]);

  
  const searchbarComponent = (
<div className={`search-container ${searchbarVisible ? 'active' : ''}`}>
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar perfumes..."
        aria-label="Buscar perfumes"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" aria-label="Buscar" onClick={toggleSearchbar} title='Buscar perfumes'>
        <i className="fas fa-search"></i>
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((perfume) => (
            <li
              key={perfume.idperfume}
              onClick={() => handleSuggestionClick(perfume.nombre)}
              className="suggestion-item"
            >
              {perfume.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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
             {isMobile && menuAbierto && searchbarComponent}
        <Link to="/" className="nav-link" onClick={() => setMenuAbierto(false)}><i className="fa-solid fa-spray-can-sparkles"></i> Inicio</Link>
        <Link to="/catalogo" className="nav-link" onClick={() => setMenuAbierto(false)}><i className="fa-solid fa-layer-group"></i> Catalogo</Link>
        
      </nav>
      
      
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/IMG/LogoPrin.png" alt="Logo de la empresa" className="logo" />
        </Link>
      </div>

<div className="user-menu">

 
{!isMobile&&searchbarComponent}

         <Link to="/pedidos" className="user-link">
          <i className="fas fa-shopping-cart"></i>  
        </Link>

 
      </div>
    </header>
  );
};

export default Header;
