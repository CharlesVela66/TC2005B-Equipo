const express = require('express');

const router = express.Router();

const rutinasController = require('../controllers/rutinas.controller');

router.get('/', rutinasController.explorar_rutinas);

router.get('/favoritas', rutinasController.explorar_rutinas_favoritas);

router.get('/:id', rutinasController.visualizar_rutinas);

module.exports = router;