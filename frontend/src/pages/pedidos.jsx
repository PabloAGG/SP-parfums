import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import Loading from '../componentes/loading';
import './PerfumeDetail.css';

const PedidosTemporales = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const EliminarPedido = (idperfumeAEliminar) => {
        const pedidosActuales = JSON.parse(localStorage.getItem('pedidos')) || [];
        const nuevosPedidos = pedidosActuales.filter(pedido => pedido.idperfume !== idperfumeAEliminar);

        localStorage.setItem('pedidos', JSON.stringify(nuevosPedidos));
        
        // Actualizamos el estado con la información completa que ya tenemos
        const pedidosEnriquecidosActualizados = pedidos.filter(p => p.perfume.idperfume !== idperfumeAEliminar);
        setPedidos(pedidosEnriquecidosActualizados);
    };

const modificarPedido = (idperfume, cambio) => {
        // Actualizamos el estado de React directamente para una respuesta instantánea
        const nuevosPedidos = pedidos.map(p => {
            if (p.idperfume === idperfume) {
                
                return { ...p, cantidad: p.cantidad + cambio };
            }
            return p;
        }).filter(p => p.cantidad > 0); 

        setPedidos(nuevosPedidos);

        const pedidosParaStorage = nuevosPedidos.map(({ idperfume, cantidad, fecha }) => ({
            idperfume,
            cantidad,
            fecha
        }));
        localStorage.setItem('pedidos', JSON.stringify(pedidosParaStorage));
    };


const CerrarPedido = async () => {
    try {
        setLoading(true);
        const pedidosLocal = JSON.parse(localStorage.getItem('pedidos')) || [];
        
        if (pedidosLocal.length === 0) {
            alert('No hay pedidos en el carrito.');
            setLoading(false);
            return;
        }

        const idpedidotemp = Date.now();
  
        const pedidoParaEnviar = pedidosLocal.map(pedido => ({
            idperfume: pedido.idperfume,
            cantidad: pedido.cantidad,
            fecha: pedido.fecha,
            idpedidotemp: idpedidotemp
        }));

        // 3. Enviamos el array completo en el cuerpo de la petición.
        const response = await fetch(`${API_URL}/api/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedidoParaEnviar), // Enviamos el array directamente
        });
        
        const data = await response.json();

        if (response.ok) {
            // 4. ¡Éxito! El backend nos devuelve los datos insertados.
            console.log('Pedido cerrado exitosamente. Datos para el recibo:', data);
            alert('Pedido cerrado exitosamente.');
            
            // Aquí puedes usar 'data' para generar tu PDF

            localStorage.removeItem('pedidos'); // Limpiamos el carrito local
            setPedidos([]); // Limpiamos la vista
        } else {
            // Si el servidor responde con un error
            throw new Error(data.error || 'Error al cerrar el pedido.');
        }

    } catch (err) {
        console.error("Error en CerrarPedido:", err);
        alert(`No se pudo cerrar el pedido: ${err.message}`);
    } finally {
        setLoading(false);
    }
}

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
                if (pedidosLocal.length === 0) {
                    setPedidos([]);
                    setLoading(false);
                    return;
                }
                const response = await fetch(`${API_URL}/api/pedidos/temporales`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pedidos: pedidosLocal }),
                });
                const data = await response.json();
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
                {pedidos.map((pedido) => ( // Cambié idx a pedido.perfume.idperfume para una key más estable
                    <div className="perfume-detail" key={pedido.perfume?.idperfume} style={{ marginBottom: 32 }}>
                        <div className="detail-image-container">
                            <img
                                src={`../IMG/${pedido.perfume?.genero}/${pedido.perfume?.marcap}/${pedido.perfume?.img_path}`
                                    || 'https://via.placeholder.com/150'
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
                                 <div className="quantity-section">
                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => modificarPedido(pedido.perfume?.idperfume, -1)}>-</button>
                                    <span className="quantity-display">{pedido.cantidad}</span>
                                    <button className="quantity-btn" onClick={() => modificarPedido(pedido.perfume?.idperfume, 1)}>+</button>
                                </div>
                            </div>

                
                            </div>
                          <br />
                            <button className='dltPerf' onClick={() => EliminarPedido(pedido.perfume.idperfume)}>Eliminar</button>
                        </div>
                    </div>
                ))} <button className='completeCarr' onClick={CerrarPedido}>Cerrar pedido</button>
            </div>
           
        </div>
    );
};

export default PedidosTemporales;