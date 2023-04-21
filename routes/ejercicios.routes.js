const express = require('express');

const router = express.Router();

const hasCreate = require('../util/has-create');

const ejerciciosController = require('../controllers/ejercicios.controller');

router.get('/editar/:id', hasCreate, ejerciciosController.get_editar);

router.get('/editar', hasCreate, ejerciciosController.get_ejercicios);

router.post('/editar', hasCreate, ejerciciosController.post_editar);

router.get('/', hasCreate, ejerciciosController.ver_ejercicios);

router.get('/agregar_ejercicios', hasCreate,ejerciciosController.get_ejercicios);

router.post('/agregar_ejercicios',hasCreate, ejerciciosController.post_ejercicios)

router.get('/:id',hasCreate, ejerciciosController.visualizar);

router.post('/eliminar', hasCreate,ejerciciosController.eliminar_ejercicios);

module.exports = router;