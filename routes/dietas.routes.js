const express = require('express');

const router = express.Router();

const dietasController = require('../controllers/dietas.controller');

router.get('/:id', dietasController.dieta_detalles);

router.post('/:id',dietasController.seleccionar_dieta);

router.get('/agregar', dietasController.get_nueva);

router.post('/agregar', dietasController.post_nueva);

router.get('/', dietasController.explorar_dietas);

router.post('/', dietasController.registrar_dieta_favorita);

module.exports = router;