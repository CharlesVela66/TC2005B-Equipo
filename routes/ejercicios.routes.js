const express = require('express');

const router = express.Router();

const ejerciciosController = require('../controllers/ejercicios.controller');

router.get('/', ejerciciosController.ver_ejercicios);

router.get('/agregar_ejercicios', ejerciciosController.get_ejercicios);

router.post('/agregar_ejercicios', ejerciciosController.post_ejercicios)

module.exports = router;