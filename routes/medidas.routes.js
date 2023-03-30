const express = require('express');

const router = express.Router();

const medidasController = require('../controllers/medidas.controller');

router.get('/', medidasController.medida);

router.post('/', medidasController.registrar_medida);

module.exports = router;