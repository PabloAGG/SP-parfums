// server.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001; // Usamos 3001 para no chocar con React

// 2. Configuración del Pool de Conexión a la Base de Datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Requerido para conexiones remotas a Supabase
    }
});


app.use(cors()); // Habilita la comunicación entre dominios
app.use(express.json()); // Permite al servidor entender JSON

// 4. Rutas (los "endpoints" de nuestra API)
app.get('/', (req, res) => {
    res.send('¡API del Catálogo funcionando!');
});

// Ruta para obtener todos los productos
app.get('/api/perfume', async (req, res) => {
    try {
        console.log("Petición recibida en /api/perfume");
        const { rows } = await pool.query('SELECT m.nombre as marcaP,p.* FROM perfume join marca m on p.marca = m.idmarca');
        res.json(rows);
        console.log("Productos obtenidos:", rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// 5. Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
