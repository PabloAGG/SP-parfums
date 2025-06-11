
import React, { useState, useEffect } from 'react';
import PerfumeCard from '../componentes/PerfumeCard';
import './Dashboard.css'; // Archivo para estilos del dashboard

const Dashboard = () => {
    // Estado para guardar los perfumes agrupados por marca
    const [perfumesPorMarca, setPerfumesPorMarca] = useState({});
const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Función para obtener los datos desde tu API
        const fetchPerfumes = async () => {
            try {
                // La URL de tu backend
                setLoading(true);
                const response = await fetch('http://localhost:3001/api/perfume');
                const data = await response.json();

                // Agrupamos los perfumes por marca
                const agrupados = data.reduce((acc, perfume) => {
                    // La API ya nos da el nombre de la marca como 'marcap'
                    const marca = perfume.marcap; 
                    if (!acc[marca]) {
                        acc[marca] = [];
                    }
                    acc[marca].push(perfume);
                    return acc;
                }, {});

                setPerfumesPorMarca(agrupados);
                setLoading(false);

            } catch (error) {
                console.error("Error al obtener los perfumes:", error);
            }
        };

        fetchPerfumes();
    }, []); // El array vacío asegura que esto se ejecute solo una vez

    if (loading) return <p>Cargando perfumes...</p>;
    if (Object.keys(perfumesPorMarca).length === 0) {
        return <p>No hay perfumes disponibles.</p>;
    }
    return (
        <div className="dashboard">
            <h1>Perfumes disponibles</h1>
            {/* Object.keys() nos da un array con los nombres de las marcas (ej. ['DIOR', 'CHANEL']).
              Luego iteramos sobre cada nombre de marca.
            */}
            {Object.keys(perfumesPorMarca).map(marca => (
                <div key={marca} className="marca-section">
                    <h2 className="marca-title">{marca}</h2>
                    <div className="perfume-list">
                       
                        {perfumesPorMarca[marca].map(perfume => (
                            <PerfumeCard key={perfume.idperfume} perfume={perfume} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;



