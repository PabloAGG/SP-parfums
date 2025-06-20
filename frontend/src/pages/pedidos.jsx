import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import Loading from '../componentes/loading';
import './PerfumeDetail.css'; // Reutiliza estilos para mantener coherencia visual

const PedidosTemporales = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Capitaliza la primera palabra (puedes reutilizar la función)
  const capitalizarPrimeraPalabraExacto = (texto) => {
    if (!texto) return '';
    const palabras = texto.split(' ');
    palabras[0] = palabras[0].charAt(0).toUpperCase() + palabras[0].slice(1);
    return palabras.join(' ');
  };

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const pedidosLocal = JSON.parse(localStorage.getItem('pedidos')) || [];
        console.log('Pedidos en localStorage:', pedidosLocal); // <-- Agrega esto
        const response = await fetch(`${API_URL}/api/pedidos/temporales`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pedidos: pedidosLocal }),
        });
        const data = await response.json();
        console.log('Respuesta del backend:', data); // <-- Y esto
        setPedidos(data.pedidos || []);
      } catch (err) {
        setError('No se pudieron cargar los pedidos temporales');
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!pedidos.length) return <p>No hay pedidos temporales.</p>;

  return (
    <div className="perfume-detail">
      <h1>Pedido</h1>
      <div className="pedidos-list">
        {pedidos.map((pedido, idx) => (
          <div className="perfume-detail" key={idx} style={{marginBottom: 32}}>
            <div className="detail-image-container">
              <img
                src={
                  pedido.perfume?.img_path
                    ? `../IMG/${pedido.perfume.genero}/${pedido.perfume.marcap}/${pedido.perfume.img_path}`
                    : 'https://via.placeholder.com/150'
                }
                alt={pedido.perfume?.nombre || 'Perfume'}
              />
            </div>
            <div className="detail-info-container">
              <h2 className="detail-name">{pedido.perfume?.nombre || 'Perfume'}</h2>
              <h3 className="detail-marca">{pedido.perfume?.marcap}</h3>
              <p className="detail-description">
                {capitalizarPrimeraPalabraExacto(pedido.perfume?.descripcion)}
              </p>
              <div className="detail-meta">
                <p><strong>Género:</strong> {pedido.perfume?.genero}</p>
                <p><strong>Clima ideal:</strong> {pedido.perfume?.clima}</p>
                <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosTemporales;