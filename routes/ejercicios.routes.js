const express = require('express');

const router = express.Router();

const ejerciciosController = require('../controllers/ejercicios.controller');

router.get('/', ejerciciosController.ver_ejercicios);

module.exports = router;