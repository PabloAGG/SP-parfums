import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para navegar programáticamente
import './PerfumeCard.css'; // Crearemos este archivo para los estilos

// Este componente recibe un objeto 'perfume' con sus datos
const PerfumeCard = ({ perfume }) => {
      const navigate = useNavigate();
const AgregarPedido= (e) => {
        e.stopPropagation();
        
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        const perfumeExistenteIndex = pedidos.findIndex(p => p.idperfume === perfume.idperfume);

    if (perfumeExistenteIndex > -1) {
        // Si existe, aumentamos la cantidad
        pedidos[perfumeExistenteIndex].cantidad += 1;
        alert(`Se agregó otra unidad de "${perfume.nombre}" a tu pedido.`);
    } else {
        // Si no existe, lo agregamos como un nuevo pedido
        pedidos.push({
            idperfume: perfume.idperfume,
            cantidad: 1,
            fecha: new Date().toISOString()
        });
        alert(`Perfume "${perfume.nombre}" agregado a tu pedido.`);
    }

    // Guardamos el array actualizado en localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
      }

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
      <div className='perfume-img-container'>
      <img 
        // Asumimos que tienes una columna 'imagen_url' o similar en tu tabla de perfumes
        src={`../IMG/${perfume.genero}/${perfume.marcap}/${perfume.img_path}` || 'https://via.placeholder.com/150'} 
        alt={`Perfume ${perfume.nombre}`} 
        className="perfume-image"
      />
       <img id='btMMCard' src='../IMG/cardBot.png' alt='Botella MariaMaria' loading='lazy' />
      </div>
         <p className='perfume-gen'>{perfume.genero}</p>
     
         <h3 className="perfume-name">{perfume.nombre}</h3>
         
      <div className="perfume-card-buttons">
    <button
      className="perfume-add-button"
      onClick={AgregarPedido}
    >
      Agregar a pedido
    </button>
    <Link to={irADetalle} className="perfume-button">
      Ver más
    </Link>
  </div>
    </div>
  );
};

export default PerfumeCard;
