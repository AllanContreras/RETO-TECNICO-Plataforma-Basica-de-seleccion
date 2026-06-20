const mongoose = require('mongoose');

const practicanteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    carrera: {
      type: String,
      required: true,
      trim: true,
    },
    semestre: {
      type: String,
      required: true,
      trim: true,
    },
    hojaVida: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ['Pendiente', 'Viable', 'No viable'],
      default: 'Pendiente',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Practicante', practicanteSchema);