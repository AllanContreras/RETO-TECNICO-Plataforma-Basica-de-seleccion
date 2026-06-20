const express = require('express');

const upload = require('../config/multer');
const {
  crearPracticante,
  obtenerPracticantes,
  actualizarEstadoPracticante,
} = require('../controllers/practicanteController');

const router = express.Router();

router.post('/', upload.single('hojaVida'), crearPracticante);
router.get('/', obtenerPracticantes);
router.put('/:id/estado', actualizarEstadoPracticante);

module.exports = router;