const express = require('express');

const router = express.Router();

const hasCreate = require('../util/has-create');

const dietasController = require('../controllers/dietas.controller');

router.get('/buscar/:valor', dietasController.get_buscar);

router.get('/agregar', hasCreate, dietasController.get_nueva);

router.post('/agregar',  hasCreate, dietasController.post_nueva);

router.post('/agregar_favs', dietasController.registrar_dieta_favorita);

router.post('/eliminar_favs', dietasController.eliminar_dieta_favorita);

router.get('/:id', dietasController.dieta_detalles);

router.post('/:id',dietasController.seleccionar_dieta);

router.get('/', dietasController.explorar_dietas);

module.exports = router;