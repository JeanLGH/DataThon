const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());
const { client } = require('./db'); // Importa el cliente PostgreSQL


const port = 3001;

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
};

// Rutas
app.get('/clima', async (req, res, next) => {
  try {
    const result = await client.query('SELECT * FROM clima');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});
// Rutas
app.get('/dengue', async (req, res, next) => {
  try {
    const result = await client.query('SELECT * FROM dengue');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});


// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// Middleware de error
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});