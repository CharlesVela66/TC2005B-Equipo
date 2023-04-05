const express = require('express');

const router = express.Router();

const rutinasController = require('../controllers/rutinas.controller');

router.get('/nueva_rutina', rutinasController.nueva_rutina);

router.post('/nueva_rutina', rutinasController.post_nueva_rutina);

router.get('/:id', rutinasController.visualizar_rutinas);

router.post('/:id',rutinasController.seleccionar_rutinas);

router.get('/', rutinasController.explorar_rutinas);

router.post('/', rutinasController.registrar_rutina_favorita);

module.exports = router;