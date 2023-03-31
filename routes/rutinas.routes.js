const express = require('express');

const router = express.Router();

const rutinasController = require('../controllers/rutinas.controller');

router.get('/', rutinasController.explorar_rutinas);

router.get('/favoritas', rutinasController.explorar_rutinas_favoritas);

router.get('/nueva_rutina', rutinasController.nueva_rutina);

router.get('/:id', rutinasController.visualizar_rutinas);

router.post('/:id',rutinasController.seleccionar_rutinas);

module.exports = router;