const express = require('express');

const router = express.Router();

const hasCreate = require('../util/has-create');

const rutinasController = require('../controllers/rutinas.controller');

router.get('/buscar/:valorA', rutinasController.get_buscar);

router.get('/agregar', hasCreate, rutinasController.nueva_rutina);

router.post('/agregar', hasCreate, rutinasController.post_nueva_rutina);

router.post('/agregar_favs', rutinasController.registrar_rutina_favorita);

router.post('/eliminar_favs', rutinasController.eliminar_rutina_favorita);

router.get('/', rutinasController.explorar_rutinas);

router.get('/:id', rutinasController.visualizar_rutinas);

router.post('/:id',rutinasController.seleccionar_rutinas);

//router.get('/editar/:id', hasCreate, rutinasController.get_editarRutina);

//router.get('/editar', hasCreate, rutinasController.get_nuevaRutina);

//router.post('/editar', hasCreate, rutinasController.post_editarRutina);

module.exports = router;