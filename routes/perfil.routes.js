const express = require('express');

const router = express.Router();

const perfilController = require('../controllers/perfil.controller');

router.get('/', perfilController.ver_perfil);

router.get('/ver_info', perfilController.verCliente);

router.post('/editar_perfil', perfilController.post_editar);

module.exports = router;