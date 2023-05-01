const express = require('express');

const router = express.Router();

const hasCreate = require('../util/has-create');

const dietasController = require('../controllers/dietas.controller');

router.get('/buscar/:valor', dietasController.get_buscar);

router.get('/agregar', hasCreate, dietasController.get_nueva);

router.post('/agregar',  hasCreate, dietasController.post_nueva);

router.post('/agregar_favs', dietasController.registrar_dieta_favorita);

router.post('/eliminar_favs', dietasController.eliminar_dieta_favorita);

router.get('/', dietasController.explorar_dietas);

router.get('/editar_d', hasCreate, dietasController.get_nueva);

router.post('/editar_d', hasCreate, dietasController.post_editar);

router.post('/eliminar', hasCreate,dietasController.eliminar_dieta);

router.get('/editar_d/:id', hasCreate, dietasController.get_editar);

router.get('/:id', dietasController.dieta_detalles);

router.post('/:id',dietasController.seleccionar_dieta);

module.exports = router;