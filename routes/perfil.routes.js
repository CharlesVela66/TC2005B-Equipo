const express = require('express');

const router = express.Router();

const perfilController = require('../controllers/perfil.controller');

router.get('/', perfilController.ver_perfil);

router.get('/:id', perfilController.ver_informacion);

module.exports = router;
