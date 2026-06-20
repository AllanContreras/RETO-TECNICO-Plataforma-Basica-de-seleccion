const Practicante = require('../models/Practicante');

const correoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

const crearPracticante = async (req, res) => {
  try {
    const { nombre, correo, carrera, semestre } = req.body;

    if (!nombre || !correo || !carrera || !semestre) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (!correoValido(correo)) {
      return res.status(400).json({ message: 'El correo electronico no es valido' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'La hoja de vida en PDF es obligatoria' });
    }

    const practicante = await Practicante.create({
      nombre,
      correo,
      carrera,
      semestre,
      hojaVida: req.file.filename,
    });

    return res.status(201).json({
      message: 'Practicante registrado correctamente',
      practicante,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar el practicante',
      error: error.message,
    });
  }
};

const obtenerPracticantes = async (req, res) => {
  try {
    const practicantes = await Practicante.find().sort({ createdAt: -1 });

    return res.json(practicantes);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los practicantes',
      error: error.message,
    });
  }
};

const actualizarEstadoPracticante = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['Viable', 'No viable'].includes(estado)) {
      return res.status(400).json({
        message: 'El estado debe ser Viable o No viable',
      });
    }

    const practicante = await Practicante.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!practicante) {
      return res.status(404).json({ message: 'Practicante no encontrado' });
    }

    return res.json({
      message: 'Estado actualizado correctamente',
      practicante,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el estado',
      error: error.message,
    });
  }
};

module.exports = {
  crearPracticante,
  obtenerPracticantes,
  actualizarEstadoPracticante,
};