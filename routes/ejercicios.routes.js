const express = require('express');

const router = express.Router();

const ejerciciosController = require('../controllers/ejercicios.controller');

router.get('/', ejerciciosController.ver_ejercicios);

router.get('/agregar_ejercicios', ejerciciosController.get_ejercicios);

router.post('/agregar_ejercicios', ejerciciosController.post_ejercicios)

router.get('/:id', ejerciciosController.visualizar);

router.get('/', ejerciciosController.visualizar);

module.exports = router;