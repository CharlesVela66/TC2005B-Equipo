const express = require('express');

const router = express.Router();

const alimentosController = require('../controllers/alimentos.controller');

router.get('/', alimentosController.ver_alimentos);

router.get('/agregar_alimentos', alimentosController.get_alimentos);

router.post('/agregar_alimentos', alimentosController.post_alimentos)

module.exports = router;