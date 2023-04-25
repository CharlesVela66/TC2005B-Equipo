const express = require('express');

const router = express.Router();

const progresoController = require('../controllers/progreso.controller');

router.get('/', progresoController.get_progreso);

router.post('/editar', progresoController.editar);

module.exports = router;