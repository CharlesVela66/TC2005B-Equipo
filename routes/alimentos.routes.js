const express = require('express');

const router = express.Router();

const alimentosController = require('../controllers/alimentos.controller');

router.get('/', alimentosController.ver_alimentos);

module.exports = router;