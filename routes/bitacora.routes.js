const express = require('express');

const router = express.Router();

const bitacoraController = require('../controllers/bitacora.controller');

router.get('/', bitacoraController.get_bitacora);

router.post('/', bitacoraController.post_bitacora);

router.post('/editar', bitacoraController.editar);

router.post('/eliminar', bitacoraController.eliminar);

module.exports = router;