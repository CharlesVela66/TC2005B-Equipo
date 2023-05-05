const express = require('express');

const router = express.Router();

const hasCreate = require('../util/has-create');

const perfilController = require('../controllers/perfil.controller');

//Ruta inicial
router.get('/', perfilController.ver_perfil);

router.get('/ver_info', perfilController.verCliente);

router.get('/editar_info', perfilController.get_editarPerfil);

router.post('/editar_info', perfilController.post_editarPerfil);

// Rutas para los administradores
router.get('/ver-info', hasCreate, perfilController.verAdministrador);
router.get('/editar-info', hasCreate, perfilController.get_editarPerfilAdmin);
router.post('/editar-info', hasCreate, perfilController.post_editarPerfilAdmin);

//Exporto el módulo 
module.exports = router;