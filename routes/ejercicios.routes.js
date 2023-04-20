const express = require('express');

const router = express.Router();

const ejerciciosController = require('../controllers/ejercicios.controller');

router.get('/editar/:id', ejerciciosController.get_editar);

router.get('/editar', ejerciciosController.get_ejercicios);

router.post('/editar', ejerciciosController.post_editar);

router.get('/', ejerciciosController.ver_ejercicios);

router.get('/agregar_ejercicios', ejerciciosController.get_ejercicios);

router.post('/agregar_ejercicios', ejerciciosController.post_ejercicios)

router.get('/:id', ejerciciosController.visualizar);

router.post('/eliminar', ejerciciosController.eliminar_ejercicios);

module.exports = router;