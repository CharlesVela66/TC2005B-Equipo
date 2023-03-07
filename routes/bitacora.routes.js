const express = require('express');

const router = express.Router();

const bitacoraController = require('../controllers/bitacora.controller');

router.get('/', bitacoraController.get_bitacora);

module.exports = router;