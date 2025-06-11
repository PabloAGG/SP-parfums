import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para navegar programáticamente
import './PerfumeCard.css'; // Crearemos este archivo para los estilos

// Este componente recibe un objeto 'perfume' con sus datos
const PerfumeCard = ({ perfume }) => {
      const navigate = useNavigate();

  const irADetalle = () => {
    navigate(`/perfume/${perfume.idperfume}`);
  };
  return (
    <div className="perfume-card" onClick={irADetalle}>

      {perfume.top && (
        <div className="top-badge">
          ⭐ Alta similitud
        </div>
      )}
      <img 
        // Asumimos que tienes una columna 'imagen_url' o similar en tu tabla de perfumes
        src={`IMG/${perfume.img_path}` || 'https://via.placeholder.com/150'} 
        alt={`Perfume ${perfume.nombre}`} 
        className="perfume-image"
      />
         <p className='perfume-gen'>{perfume.genero}</p>
         <h3 className="perfume-name">{perfume.nombre}</h3>
  
      {/* El botón "Ver más" es un Link que nos lleva a la página de detalle */}
      <Link to={irADetalle} className="perfume-button">
        Ver más
      </Link>
    </div>
  );
};

export default PerfumeCard;
