const express = require('express');

const router = express.Router();

const progresoController = require('../controllers/progreso.controller');

router.get('/', progresoController.get_progreso);

router.post('/', progresoController.post_progreso);

module.exports = router;