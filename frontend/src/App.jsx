import React, { useState, useEffect } from 'react';
import './App.css'; // Vite ya incluye este archivo para estilos

function App() {
    // 'useState' es un "Hook" de React para guardar estados (datos que cambian)
    const [perfumes, setperfumes] = useState([]); // Inicia como un array vacío
    const [loading, setLoading] = useState(true); // Para mostrar un mensaje de carga
    const [error, setError] = useState(null); // Para guardar errores

    // La URL de tu API del backend
    const API_URL = "http://localhost:3001";

    // 'useEffect' es un Hook que ejecuta código cuando el componente se "monta" (carga)
    useEffect(() => {
        // Definimos una función asíncrona para obtener los datos
        const fetchperfumes = async () => {
            try {
      const response = await fetch('http://localhost:3001/api/perfume');
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                const data = await response.json();
                setperfumes(data); // Guardamos los perfumeos en el estado
            } catch (err) {
                setError(err.message); // Guardamos el error
            } finally {
                setLoading(false); // Dejamos de cargar, ya sea con éxito o error
            }
        };

        fetchperfumes(); // Ejecutamos la función
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez

    // Lógica de renderizado
    if (loading) return <div>Cargando perfumeos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nuestro Catálogo de Perfumes</h1>
            </header>
            <main className="perfumes-grid">
                {perfumes.map(perfume => (
                    // Usamos .map() para crear un elemento por cada perfumeo
                    // La 'key' es muy importante para que React identifique cada elemento
                    <div key={perfume.id} className="perfume-card">
                        <h2>{perfume.nombre}</h2>
                        <p>{perfume.marcaP}</p>
                        <p>descripcion:{perfume.description}</p>
                        <p>climas:{perfume.clima}</p>
                        <p></p>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
