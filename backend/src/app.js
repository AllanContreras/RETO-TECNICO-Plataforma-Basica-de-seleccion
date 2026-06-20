const express = require('express');
const cors = require('cors');
const path = require('path');
const practicanteRoutes = require('./routes/practicanteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API de la Plataforma Basica de Seleccion de Practicantes',
  });
});

app.use('/api/practicantes', practicanteRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use((error, req, res, next) => {
  if (error && error.message === 'Solo se permiten archivos PDF') {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({
    message: 'Error interno del servidor',
  });
});

module.exports = app;
