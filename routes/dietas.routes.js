const express = require('express');

const router = express.Router();

const dietasController = require('../controllers/dietas.controller');

router.get('/', dietasController.explorar_dietas);

router.get('/favoritas', dietasController.explorar_dietas_favoritas);

router.get('/:id', dietasController.visualizar);

router.get('/', dietasController.visualizar);

router.post('/:id',dietasController.seleccionar);

router.get('/agregar', dietasController.get_nueva);

router.post('/agregar', dietasController.post_nueva);

module.exports = router;