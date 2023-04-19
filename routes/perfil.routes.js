const express = require('express');

const router = express.Router();

const perfilController = require('../controllers/perfil.controller');

router.get('/', perfilController.ver_perfil);

router.get('/ver_info', perfilController.verCliente);

router.get('/editar/perfil', perfilController.get_editarPerfil);
router.post('/editar/perfil', perfilController.post_editarPerfil);

module.exports = router;