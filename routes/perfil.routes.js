const express = require('express');

const router = express.Router();

const perfilController = require('../controllers/perfil.controller');

router.get('/', perfilController.ver_perfil);

router.get('/ver_info', perfilController.verCliente);

router.get('/ver-info', perfilController.verAdministrador);

//router.get('/editar_info', perfilController.get_editarPerfil);
//router.post('/editar_info', perfilController.post_editarPerfil);

router.get('/editar-info', perfilController.get_editarPerfilAdmin);
router.post('/editar-info', perfilController.post_editarPerfilAdmin);

module.exports = router;